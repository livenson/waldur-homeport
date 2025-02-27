import { customersRetrieve, invoiceItemsCostsList } from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { get, sendForm } from '@waldur/core/api';
import { formatDate } from '@waldur/core/dateUtils';
import { Customer } from '@waldur/workspace/types';

export interface ProjectInput {
  name: string;
  description: string;
  end_date?: Date;
  start_date?: Date;
  customer: { url: string };
  type?: { url: string };
  oecd_fos_2007_code?: { value: string };
  is_industry: boolean;
  image?: File | string;
}

export const getCustomer = (customerId: string) =>
  customersRetrieve({ path: { uuid: customerId } }).then(
    (r) => r.data as any as Customer,
  );

export const createProject = (project: ProjectInput) => {
  const data = {
    name: project.name,
    description: project.description,
    end_date: project.end_date ? formatDate(project.end_date) : undefined,
    start_date: project.start_date ? formatDate(project.start_date) : undefined,
    customer: project.customer.url,
    type: project.type?.url,
    oecd_fos_2007_code: project.oecd_fos_2007_code?.value,
    is_industry: project.is_industry,
    image: project.image,
  };
  if (!project.image) {
    // If user tries to remove image
    data.image = '';
  } else if (!(project.image instanceof File)) {
    // if user tries to keep the current image we should not send the image key
    data.image = undefined;
  }
  return sendForm<{ uuid }>('POST', `${ENV.apiEndpoint}api/projects/`, data);
};

export const updateProject = (
  projectUuid: string,
  values: Record<string, any>,
) => {
  const data = { ...values };
  if ('end_date' in data) {
    data.end_date = formatDate(data.end_date);
  }
  if ('start_date' in data) {
    data.start_date = formatDate(data.start_date);
  }
  if ('oecd_fos_2007_code' in data) {
    data.oecd_fos_2007_code = data.oecd_fos_2007_code?.value;
  }
  if ('image' in data && !data.image) {
    data.image = '';
  }
  return sendForm(
    'PATCH',
    `${ENV.apiEndpoint}api/projects/${projectUuid}/`,
    data,
  );
};

export const loadProjectTypes = () =>
  get<{ url; name }[]>(`/project-types/`).then((response) => response.data);

export const fetchLast12MonthProjectCosts = (projectId: string) =>
  invoiceItemsCostsList({
    query: {
      project_uuid: projectId,
      page: 1,
      page_size: 12,
    },
  }).then((response) => response.data);
