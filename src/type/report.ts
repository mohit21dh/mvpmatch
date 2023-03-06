export type IReport = {
    paymentId: string;
    amount: number;
    projectId: string;
    gatewayId: string;
    userIds: string[];
    modified: string;
    created: string;
};

export type IReportResponse = {
    code: string;
    data: IReport[];
    error: any
};

export type GroupedReportsByProject = {
    [key: string]: {
        reports: IReport[],
        sum: number
    }
}

export type GroupedReportsByGateway = {
    [key: string]: {
        projects: {
            value: string,
            amount: number
        }[],
        sum: number
    }
}

export type SelectedFilters = {
    project: string,
    gateway: string,
    fromDate: Date,
    toDate: Date
}
