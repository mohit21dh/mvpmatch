import {
  type GroupedReportsByGateway,
  type GroupedReportsByProject,
  type IReport,
} from '../type/report';

export const groupReportByProject = (reports: IReport[]): GroupedReportsByProject => {
  return reports.reduce<GroupedReportsByProject>((acc, report) => {
    const { projectId, amount } = report;
    if (projectId in acc) {
      acc[projectId].reports.push(report);
      acc[projectId].sum += amount;
    } else {
      acc[projectId] = {
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
        projects: [
          {
            value: projectId,
            amount,
          },
        ],
        sum: amount,
      };
      return acc;
    }

    const existingProjectIndex = acc[gatewayId].projects.findIndex(
      (project) => project.value === projectId,
    );

    if (existingProjectIndex === -1) {
      acc[gatewayId].projects.push({
        value: projectId,
        amount,
      });
    } else {
      acc[gatewayId].projects[existingProjectIndex] = {
        value: projectId,
        amount: amount + acc[gatewayId].projects[existingProjectIndex].amount,
      };
    }
    acc[gatewayId].sum += amount;
    return acc;
  }, {});
};
