import { type FC, useMemo, useState } from 'react';
import { getAllGateways, getAllProjects, getReports } from '../../api/mockApi';
import { type IGateway } from '../../type/gateway';
import { type IProject } from '../../type/project';
import { DatePicker } from '../Datepicker';
import { Select } from '../Select';
import { EmptyContent } from './EmptyContent';
import { groupReportByGateway, groupReportByKey, groupReportByProject } from '../../helpers/report';
import { filterStartDate } from '../../helpers/date';
import { type IReport, type SelectedFilters } from '../../type/report';
import { useGetSetData } from '../../hooks/useGetSetData';
import { ALL_OPTION_VALUE } from '../../helpers/filters';
import { GatewayProjects } from './GatewayProjects';
import { ProjectListView } from './ProjectListView';
import classNames from 'classnames';

export const Main: FC = () => {
  const nowDate = new Date();
  const startFromDate = useMemo(() => {
    return filterStartDate(nowDate);
  }, [nowDate]);

  const { data: projects } = useGetSetData<IProject, undefined>({
    initData: [],
    getterFunction: getAllProjects,
  });
  const { data: gateways } = useGetSetData<IGateway, undefined>({
    initData: [],
    getterFunction: getAllGateways,
  });
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    project: ALL_OPTION_VALUE,
    gateway: ALL_OPTION_VALUE,
    fromDate: startFromDate,
    toDate: nowDate,
  });
  const { data: reports, setData: setReports } = useGetSetData<IReport, SelectedFilters>({
    initData: [],
    getterFunction: getReports as any,
    initPayload: selectedFilters,
  });

  const fetchReports = async (): Promise<void> => {
    const resp = await getReports(selectedFilters);
    setReports(resp);
  };

  const groupedReports = useMemo(() => {
    return groupReportByKey(reports, 'projectId');
  }, [reports]);

  const groupedReportsByGatewayId = useMemo(() => {
    return groupReportByKey(reports, 'gatewayId');
  }, [reports]);

  const groupedGatewayReport = useMemo(() => {
    return groupReportByGateway(reports);
  }, [reports]);

  const groupedProjectReport = useMemo(() => {
    return groupReportByProject(reports);
  }, [reports]);

  const finalProjectIds = Object.keys(groupedReports);
  const finalGatewayIds = Object.keys(groupedGatewayReport);
  const hasSingleGateway = finalGatewayIds.length === 1;
  const hasSingleProject = finalProjectIds.length === 1;

  const denormalizedProjects = projects.reduce<Record<string, IProject>>((acc, val) => {
    return {
      ...acc,
      [val.projectId]: val,
    };
  }, {});

  const denormalizedGateways = gateways.reduce<Record<string, IGateway>>((acc, val) => {
    return {
      ...acc,
      [val.gatewayId]: val,
    };
  }, {});

  const selectedProjectName = hasSingleProject
    ? denormalizedProjects[finalProjectIds[0]]?.name
    : 'All Projects';
  const selectedGatewayName = hasSingleGateway
    ? denormalizedGateways[finalGatewayIds[0]]?.name
    : 'All Gateways';

  const { entries: gatewayProjects, sum: gatewayProjectSum } =
    Object.values(groupedGatewayReport)[0] ?? {};

  const { entries: gatewayProjectsByGateway, sum: gatewayGroupedSum } =
    Object.values(groupedProjectReport)[0] ?? {};

  const hasAllProjectAndGateways = !hasSingleGateway && !hasSingleProject;
  const hasSingleGatewayAndProject = hasSingleGateway && hasSingleProject;
  const hasSingleGatewayAllProject = hasSingleGateway && !hasSingleProject;
  const hasSingleProjectAllGateway = hasSingleProject && !hasSingleGateway;

  const showOnlyProjects = hasAllProjectAndGateways || hasSingleGatewayAndProject;
  const showGatewayOfProjects = hasSingleGatewayAllProject || hasSingleProjectAllGateway;

  const gatewayProjectsProps = hasSingleGatewayAllProject
    ? {
        gatewayProjectSum,
        gatewayProjects,
        idMapCb: (val: IProject) => val.name,
        idMap: denormalizedProjects,
        totalPrefixText: 'Project',
      }
    : {
        gatewayProjectSum: gatewayGroupedSum,
        gatewayProjects: gatewayProjectsByGateway,
        idMapCb: (val: IGateway) => `${val.type} - ${val.name}`,
        idMap: denormalizedGateways,
        totalPrefixText: 'Gateway',
      };

  return (
    <main className='ml-20 mt-4'>
      <div className='flex flex-col items-center md:flex-row gap-2'>
        <div className='text-xl font-extrabold'>Reports</div>
        <div className='w-full pr-4 justify-end flex items-center flex-col md:flex-row gap-2'>
          <Select
            options={projects.map((project) => ({
              label: project.name,
              value: project.projectId,
            }))}
            handleChange={(val) => {
              setSelectedFilters((v) => ({
                ...v,
                project: val,
              }));
            }}
            selectedValue={selectedFilters.project}
            hasAll
            allOptionsLabel='All Projects'
          />

          <Select
            options={gateways.map((gateway) => ({
              label: gateway.name,
              value: gateway.gatewayId,
            }))}
            handleChange={(val) => {
              setSelectedFilters((v) => ({
                ...v,
                gateway: val,
              }));
            }}
            selectedValue={selectedFilters.gateway}
            hasAll
            allOptionsLabel='All Gateways'
          />

          <DatePicker
            placeholder='From date'
            dateValue={selectedFilters.fromDate}
            maxDate={new Date()}
            handleDateChange={(val) => {
              if (val == null) return;
              setSelectedFilters((v) => ({
                ...v,
                fromDate: val,
              }));
            }}
          />

          <DatePicker
            placeholder='To date'
            dateValue={selectedFilters.toDate}
            minDate={selectedFilters.fromDate}
            handleDateChange={(val) => {
              if (val == null) return;
              setSelectedFilters((v) => ({
                ...v,
                toDate: val,
              }));
            }}
          />

          <button
            type='button'
            className='text-white w-full md:w-40 shadow h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={() => {
              fetchReports().catch((err) => {
                console.error('some error while fetching reports', err);
              });
            }}
          >
            Generate report
          </button>
        </div>
      </div>
      <div className='self-start'>Easily generate a report of your transactions</div>
      {reports.length > 0 ? (
        <div
          className={classNames([
            'grid grid-rows-2 gap-2',
            {
              'grid-cols-1 md:grid-cols-2': showGatewayOfProjects,
              'grid-cols-1': showOnlyProjects,
            },
          ])}
        >
          <ProjectListView
            layoutAdditionalClasses={{
              'w-full': true,
            }}
            groupedReports={groupedReports}
            groupedReportsByGatewayId={groupedReportsByGatewayId}
            projectPropMap={denormalizedProjects}
            viewHeading={`${selectedProjectName ?? ''} | ${selectedGatewayName ?? ''}`}
            finalProjectIds={finalProjectIds}
            gatewayPropMap={denormalizedGateways}
            filterCriteria={{
              hasAllProjectAndGateways,
              hasSingleGatewayAllProject,
              hasSingleGatewayAndProject,
              hasSingleProjectAllGateway,
            }}
          />

          {showGatewayOfProjects && <GatewayProjects {...gatewayProjectsProps} />}
        </div>
      ) : (
        <EmptyContent />
      )}
    </main>
  );
};
