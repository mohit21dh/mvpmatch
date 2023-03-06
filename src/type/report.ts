export interface IReport {
  paymentId: string;
  amount: number;
  projectId: string;
  gatewayId: string;
  userIds: string[];
  modified: string;
  created: string;
}

export interface IReportResponse {
  code: string;
  data: IReport[];
  error: any;
}

export type GroupedReportsByProject = Record<
  string,
  {
    reports: IReport[];
    sum: number;
  }
>;

export type GroupedReportsByGateway = Record<
  string,
  {
    projects: Array<{
      value: string;
      amount: number;
    }>;
    sum: number;
  }
>;

export interface SelectedFilters {
  project: string;
  gateway: string;
  fromDate: Date;
  toDate: Date;
}
