import Axios, { AxiosPromise } from 'axios';

import {
  proposalProtectedCallsList,
  proposalPublicCallsList,
  ProposalPublicCallsListData,
  ProtectedRound,
} from '@waldur/api';
import { ENV } from '@waldur/configs/default';
import { fixURL, getAll, parseSelectData, post, put } from '@waldur/core/api';
import { returnReactSelectAsyncPaginateObject } from '@waldur/core/utils';
import { GenericPermission } from '@waldur/permissions/types';

import { Call, CallOffering, Proposal, ProposalReview } from './types';

function patch<T = {}>(endpoint: string, data?: any): AxiosPromise<T> {
  return Axios.patch(fixURL(endpoint), data);
}

export const createCall = (data) =>
  post<Call>('/proposal-protected-calls/', data);

export const updateCall = (data, uuid) =>
  patch<Call>(`/proposal-protected-calls/${uuid}/`, data);

export const updateCallState = (state: 'activate' | 'archive', uuid) =>
  post<Call>(`/proposal-protected-calls/${uuid}/${state}/`);

export const createCallRound = (callUuid, data) => {
  return post<ProtectedRound>(
    `/proposal-protected-calls/${callUuid}/rounds/`,
    data,
  );
};

export const updateCallRound = (callUuid, roundUuid, data) =>
  put<ProtectedRound>(
    `/proposal-protected-calls/${callUuid}/rounds/${roundUuid}/`,
    data,
  );

export const createCallOffering = (callUuid, data) =>
  post<CallOffering>(`/proposal-protected-calls/${callUuid}/offerings/`, data);

export const callAutocomplete = async (
  query: ProposalPublicCallsListData['query'],
  prevOptions,
  currentPage: number,
  protectedCalls = false,
) => {
  const api = protectedCalls
    ? proposalProtectedCallsList
    : proposalPublicCallsList;
  const response = await api({
    query: {
      field: ['name', 'uuid', 'url'],
      o: ['name'],
      ...query,
      page: currentPage,
      page_size: ENV.pageSize,
    },
  });
  return returnReactSelectAsyncPaginateObject(
    parseSelectData(response),
    prevOptions,
    currentPage,
  );
};

export const getAllCallUsers = (callUuid, role = null) =>
  getAll<GenericPermission>(
    `/proposal-protected-calls/${callUuid}/list_users/`,
    role ? { params: { role } } : null,
  );

export const submitProposal = (uuid) =>
  post<Proposal>(`/proposal-proposals/${uuid}/submit/`);

export const createProposalResource = (data, proposalUuid) =>
  post<Proposal>(`/proposal-proposals/${proposalUuid}/resources/`, data);

export const updateProposalResource = (data, proposalUuid, uuid) =>
  patch<Proposal>(
    `/proposal-proposals/${proposalUuid}/resources/${uuid}/`,
    data,
  );

export const getAllProposalReviews = (proposalUuid) =>
  getAll<ProposalReview>('/proposal-reviews/', {
    params: { proposal_uuid: proposalUuid },
  });

export const updateProposalReview = (data, uuid) =>
  patch<ProposalReview>(`/proposal-reviews/${uuid}/`, data);

export const deleteRequestedOffering = (requestedOfferingURL: string) =>
  Axios.delete(requestedOfferingURL);
