import classNames from 'classnames';
import { type FC } from 'react';
import { formatCurrency } from '../../helpers/currency';
import { type IGateway } from '../../type/gateway';
import { type IProject } from '../../type/project';
import { type GroupedReportsByProject } from '../../type/report';
import { Accordion } from '../Accordion';
import { Table } from '../Table';

export const GatewayListView: FC<{
  viewHeading: string;
  layoutAdditionalClasses: Record<string, boolean>;
  finalProjectIds: string[];
  projects: IProject[];
  groupedReports: GroupedReportsByProject;
  gateways: IGateway[];
  showProjectsTotal: boolean;
  hasAllProjectAndGateways: boolean;
}> = ({
  viewHeading,
  layoutAdditionalClasses,
  finalProjectIds,
  projects,
  groupedReports,
  gateways,
  hasAllProjectAndGateways,
}) => {
  const renderTable = (projectId: string): JSX.Element =>
    hasAllProjectAndGateways ? (
      <Table
        headers={['Date', 'Gateway', 'Transaction Id', 'Amount']}
        rows={groupedReports[projectId]?.reports?.map((report) => ({
          cols: [
            report.created,
            gateways.find((gateway) => gateway.gatewayId === report.gatewayId)?.name,
            report.paymentId,
            formatCurrency(report.amount),
          ],
        }))}
      />
    ) : (
      <Table
        headers={['Date', 'Transaction Id', 'Amount']}
        rows={groupedReports[projectId]?.reports?.map((report) => ({
          cols: [report.created, report.paymentId, formatCurrency(report.amount)],
        }))}
      />
    );
  return (
    <>
      <div
        className={classNames([
          'flex row-start-1 bg-[#F1FAFE] flex-col space-y-8 rounded-md p-4',
          layoutAdditionalClasses,
        ])}
      >
        <div className='self-start font-extrabold'>{viewHeading}</div>
        {finalProjectIds.map((pid, index) => {
          const { name, projectId } = projects.find(
            (project) => project.projectId === pid,
          ) as IProject;
          return hasAllProjectAndGateways ? (
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
      </div>
    </>
  );
};
