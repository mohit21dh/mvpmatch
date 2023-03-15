import classNames from 'classnames';
import { type FC } from 'react';
import { formatCurrency } from '../../helpers/currency';
import { type IGateway } from '../../type/gateway';
import { type IProject } from '../../type/project';
import { type GroupedReportsByProject } from '../../type/report';
import { Accordion } from '../Accordion';
import { Table } from '../Table';

export const ProjectListView: FC<{
  viewHeading: string;
  layoutAdditionalClasses: Record<string, boolean>;
  finalProjectIds: string[];
  groupedReports: GroupedReportsByProject;
  groupedReportsByGatewayId: GroupedReportsByProject;
  projectPropMap: Record<string, IProject>;
  gatewayPropMap: Record<string, IGateway>;
  filterCriteria: {
    hasAllProjectAndGateways: boolean;
    hasSingleGatewayAndProject: boolean;
    hasSingleGatewayAllProject: boolean;
    hasSingleProjectAllGateway: boolean;
  };
}> = ({
  viewHeading,
  layoutAdditionalClasses,
  finalProjectIds,
  projectPropMap,
  groupedReports,
  groupedReportsByGatewayId,
  gatewayPropMap,
  filterCriteria,
}) => {
  const renderTable = (id: string): JSX.Element => {
    let tableOuput = <></>;
    if (filterCriteria.hasAllProjectAndGateways) {
      tableOuput = (
        <Table
          headers={['Date', 'Gateway', 'Transaction Id', 'Amount']}
          rows={groupedReports[id]?.reports?.map((report) => ({
            cols: [
              report.created,
              gatewayPropMap[report.gatewayId]?.name,
              report.paymentId,
              formatCurrency(report.amount),
            ],
          }))}
        />
      );
    } else if (filterCriteria.hasSingleGatewayAndProject) {
      tableOuput = (
        <Table
          headers={['Date', 'Transaction Id', 'Amount']}
          rows={groupedReports[id]?.reports?.map((report) => ({
            cols: [report.created, report.paymentId, formatCurrency(report.amount)],
          }))}
        />
      );
    } else {
      tableOuput = (
        <Table
          headers={['Date', 'Transaction Id', 'Amount']}
          rows={groupedReportsByGatewayId[id]?.reports?.map((report) => ({
            cols: [report.created, report.paymentId, formatCurrency(report.amount)],
          }))}
        />
      );
    }
    return tableOuput;
  };

  const iterableIsProject =
    filterCriteria.hasAllProjectAndGateways || filterCriteria.hasSingleGatewayAndProject;
  const groupedGatewayKeys = Object.keys(groupedReportsByGatewayId);
  return (
    <>
      <div
        className={classNames([
          'flex row-start-1 bg-[#F1FAFE] mt-6 flex-col space-y-8 rounded-md p-4',
          layoutAdditionalClasses,
        ])}
      >
        <div className='self-start font-extrabold'>{viewHeading}</div>
        {iterableIsProject &&
          finalProjectIds.map((pid, index) => {
            const { name, projectId } = projectPropMap[pid];
            return filterCriteria.hasAllProjectAndGateways ? (
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
                          TOTAL: {formatCurrency(groupedReports[projectId].sum)}
                        </div>
                      </div>
                    ),
                    content: renderTable(projectId),
                  },
                ]}
              />
            ) : (
              renderTable(projectId)
            );
          })}
        {!iterableIsProject &&
          groupedGatewayKeys.map((gid, index) => {
            const { name, gatewayId } = gatewayPropMap[gid];
            return filterCriteria.hasSingleProjectAllGateway ? (
              <Accordion
                key={gatewayId}
                preExpandedIds={index === 0 ? [gatewayId] : []}
                items={[
                  {
                    id: gatewayId,
                    heading: (
                      <div className='flex w-full font-extrabold'>
                        <div>{name}</div>
                        <div className='ml-auto'>
                          TOTAL: {formatCurrency(groupedReportsByGatewayId[gatewayId].sum)}
                        </div>
                      </div>
                    ),
                    content: renderTable(gatewayId),
                  },
                ]}
              />
            ) : (
              renderTable(gatewayId)
            );
          })}
      </div>
      {(filterCriteria.hasAllProjectAndGateways || filterCriteria.hasSingleGatewayAndProject) && (
        <div className='mt-10 bg-[#F1FAFE] font-bold px-6 row-start-2 col-span-1 flex items-center rounded-md h-16'>
          <span>
            Total:{' '}
            {formatCurrency(
              finalProjectIds.reduce((acc, val) => {
                return acc + groupedReports[val].sum;
              }, 0),
            )}
          </span>
        </div>
      )}
    </>
  );
};
