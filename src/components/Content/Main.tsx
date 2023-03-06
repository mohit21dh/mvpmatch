import { type FC, useMemo, useState } from 'react';
import classNames from 'classnames';
import { getAllGateways, getAllProjects, getReports } from '../../api/mockApi';
import { type IGateway } from '../../type/gateway';
import { type IProject } from '../../type/project';
import { Accordion } from '../Accordion';
import { DatePicker } from '../Datepicker';
import { Select } from '../Select';
import { Table } from '../Table';
import { EmptyContent } from './EmptyContent';
import { PieChart } from '../PieChart.tsx';
import { groupReportByGateway, groupReportByProject } from '../../helpers/report';
import { projectColors } from '../../helpers/colors';
import { filterStartDate } from '../../helpers/date';
import { type IReport, type SelectedFilters } from '../../type/report';
import { useGetSetData } from '../../hooks/useGetSetData';
import { ALL_OPTION_VALUE } from '../../helpers/filters';

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
    return groupReportByProject(reports);
  }, [reports]);

  const groupedGatewayReport = useMemo(() => {
    return groupReportByGateway(reports);
  }, [reports]);

  const finalProjectIds = Object.keys(groupedReports);
  const finalGatewayIds = Object.keys(groupedGatewayReport);
  const hasSingleGateway = Object.keys(finalGatewayIds).length === 1;
  const hasSingleProject = Object.keys(finalProjectIds).length === 1;

  const selectedProjectName = hasSingleProject
    ? projects.find(({ projectId }) => projectId === finalProjectIds[0])?.name
    : 'All Projects';
  const selectedGatewayName = hasSingleGateway
    ? gateways.find(({ gatewayId }) => gatewayId === finalGatewayIds[0])?.name
    : 'All Gateways';

  const { projects: gatewayProjects, sum: gatewayProjectSum } =
    groupedGatewayReport[finalGatewayIds[0]] ?? {};

  const showGatewayOfProjects = hasSingleGateway && !hasSingleProject;
  const showOnlyProjects = !hasSingleGateway || hasSingleProject;
  return (
    <main className='ml-20 mt-4'>
      <div className='grid justify-items-start grid-cols-3 grid-rows-2'>
        <div className='row-start-1 col-span-1 text-xl font-extrabold'>Reports</div>
        <div className='row-start-1 col-start-2 col-span-2 w-full pr-4 justify-end flex gap-2'>
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
            className='text-white shadow h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={() => {
              fetchReports().catch((err) => {
                console.error('some error while fetching reports', err);
              });
            }}
          >
            Generate report
          </button>
        </div>
        <div className='row-start-2 col-span-1'>Easily generate a report of your transactions</div>
      </div>
      {reports.length > 0 ? (
        <div className='bg-[#F1FAFE] w-[99%] mr-12 h-screen rounded-2xl p-4'>
          <div className='flex font-extrabold'>
            {selectedProjectName} | {selectedGatewayName}
          </div>
          <div className='flex gap-2'>
            <div
              className={classNames([
                'flex flex-col mt-8 space-y-8',
                {
                  'w-[55%]': showGatewayOfProjects,
                  'w-[100%]': showOnlyProjects,
                },
              ])}
            >
              {finalProjectIds.map((pid, index) => {
                const { name, projectId } = projects.find(
                  (project) => project.projectId === pid,
                ) as IProject;
                return (
                  <Accordion
                    key={projectId}
                    preExpandedIds={index === 0 ? [projectId] : []}
                    items={[
                      {
                        id: projectId,
                        heading: (
                          <div className='flex w-full font-extrabold'>
                            <div>{name}</div>
                            <div className='ml-auto'>
                              TOTAL: {groupedReports[projectId]?.sum?.toFixed(2)} USD
                            </div>
                          </div>
                        ),
                        content: (
                          <Table
                            headers={['Date', 'Gateway', 'Transaction Id', 'Amount']}
                            rows={groupedReports[projectId]?.reports?.map((report) => ({
                              cols: [
                                report.created,
                                gateways.find((gateway) => gateway.gatewayId === report.gatewayId)
                                  ?.name,
                                report.paymentId,
                                `${report.amount} USD`,
                              ],
                            }))}
                          />
                        ),
                      },
                    ]}
                  />
                );
              })}
            </div>
            {showGatewayOfProjects && (
              <div className='w-[40%]'>
                <>
                  <div className='flex items-center gap-4'>
                    {gatewayProjects?.map((prj, index) => {
                      return (
                        <>
                          <p
                            className={`w-4 h-4 rounded`}
                            style={{
                              backgroundColor: projectColors[index],
                            }}
                          />
                          <div>
                            {projects.find((project) => project.projectId === prj.value)?.name}
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <PieChart
                    data={gatewayProjects?.map((val, index) => {
                      return {
                        title: val.value,
                        value: Math.floor((val.amount / gatewayProjectSum) * 100),
                        color: projectColors[index],
                      };
                    })}
                  />
                </>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyContent />
      )}
    </main>
  );
};
