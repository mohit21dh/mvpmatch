import {
  type GroupedReportsByGateway,
  type GroupedReportsByProject,
  type IReport,
} from '../type/report';

export const groupReportByKey = (
  reports: IReport[],
  key: 'projectId' | 'gatewayId',
): GroupedReportsByProject => {
  return reports.reduce<GroupedReportsByProject>((acc, report) => {
    const { [key]: activeKey, amount } = report;
    if (activeKey in acc) {
      acc[activeKey].reports.push(report);
      acc[activeKey].sum += amount;
    } else {
      acc[activeKey] = {
        reports: [report],
        sum: amount,
      };
    }
    return acc;
  }, {});
};

export const groupReportByGateway = (reports: IReport[]): GroupedReportsByGateway => {
  return reports.reduce<GroupedReportsByGateway>((acc, report) => {
    const { gatewayId, projectId, amount } = report;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!acc[gatewayId]) {
      acc[gatewayId] = {
        entries: [
          {
            value: projectId,
            amount,
          },
        ],
        sum: amount,
      };
      return acc;
    }

    const existingProjectIndex = acc[gatewayId].entries.findIndex(
      (project) => project.value === projectId,
    );

    if (existingProjectIndex === -1) {
      acc[gatewayId].entries.push({
        value: projectId,
        amount,
      });
    } else {
      acc[gatewayId].entries[existingProjectIndex] = {
        value: projectId,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        amount: amount + acc[gatewayId].entries[existingProjectIndex].amount,
      };
    }
    acc[gatewayId].sum += amount;
    return acc;
  }, {});
};

export const groupReportByProject = (reports: IReport[]): GroupedReportsByGateway => {
  return reports.reduce<GroupedReportsByGateway>((acc, report) => {
    const { gatewayId, projectId, amount } = report;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!acc[projectId]) {
      acc[projectId] = {
        entries: [
          {
            value: gatewayId,
            amount,
          },
        ],
        sum: amount,
      };
      return acc;
    }

    const existingGatewayIndex = acc[projectId].entries.findIndex(
      (gateway) => gateway.value === gatewayId,
    );

    if (existingGatewayIndex === -1) {
      acc[projectId].entries.push({
        value: gatewayId,
        amount,
      });
    } else {
      acc[projectId].entries[existingGatewayIndex] = {
        value: gatewayId,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        amount: amount + acc[projectId].entries[existingGatewayIndex].amount,
      };
    }
    acc[projectId].sum += amount;
    return acc;
  }, {});
};
