import axios from 'axios';
import { dateFormat } from '../helpers/date';
import { isAllOption } from '../helpers/filters';
import { type IGatewayResponseData } from '../type/gateway';
import { type IProjectsResponse } from '../type/project';
import { type IReportResponse, type SelectedFilters } from '../type/report';

axios.defaults.baseURL = 'http://178.63.13.157:8090/mock-api/api';

export const getAllProjects = async (): Promise<IProjectsResponse['data']> => {
  try {
    const projectsResponse = await axios.get<IProjectsResponse>('/projects');
    return projectsResponse.data.data;
  } catch (e) {
    console.error('error is', e);
    return [];
  }
};

export const getAllGateways = async (): Promise<IGatewayResponseData['data']> => {
  try {
    const projectsResponse = await axios.get<IGatewayResponseData>('/gateways');
    return projectsResponse.data.data;
  } catch (e) {
    console.error('error is', e);
    return [];
  }
};

export const getReports = async ({
  project,
  gateway,
  fromDate,
  toDate,
}: SelectedFilters): Promise<IReportResponse['data']> => {
  try {
    const projectsResponse = await axios.post<IReportResponse>('/report', {
      from: dateFormat(fromDate),
      to: dateFormat(toDate),
      projectId: isAllOption(project) ? undefined : project,
      gatewayId: isAllOption(gateway) ? undefined : gateway,
    });
    return projectsResponse.data.data;
  } catch (e) {
    console.error('error is', e);
    return [];
  }
};
