import { ProtectedRound } from '@waldur/api';
import { Limits } from '@waldur/marketplace/details/types';
import { AttributesType, Offering, Plan } from '@waldur/marketplace/types';

export type RoundReviewStrategy = 'after_round' | 'after_proposal';

export type RoundAllocationStrategy = 'by_call_manager' | 'automatic';

export type RoundAllocationTime = 'on_decision' | 'fixed_date';

export type CallState = 'active' | 'draft' | 'archived';

export type ProposalState =
  | 'draft'
  | 'submitted'
  | 'in_review'
  | 'in_revision'
  | 'accepted'
  | 'rejected'
  | 'canceled';

export type CallOfferingState = 'requested' | 'accepted' | 'canceled';

export type ReviewState = 'created' | 'in_review' | 'submitted' | 'rejected';

export interface Call {
  default_project_role: string;
  default_project_role_name: string;
  url: string;
  uuid: string;
  created: string;
  name: string;
  description: string;
  reference_code: string;
  start_date: string;
  end_date: string;
  state: CallState;
  manager: string;
  customer_name: string;
  customer_uuid: string;
  created_by: string;
  external_url?: string;
  backend_id?: string;
  offerings: CallOffering[];
  rounds: ProtectedRound[];
}

export interface EditCallProps {
  call: Call;
  name: string;
  title: string;

  refetch(): void;
}

export interface Proposal {
  uuid: string;
  url: string;
  name: string;
  call_name: string;
  call_uuid: string;
  description: string;
  project_summary: string;
  project_is_confidential: boolean;
  project_has_civilian_purpose: boolean;
  supporting_documentation: any[];
  state: ProposalState;
  approved_by: string;
  created_by: string;
  duration_in_days: number;
  project: string;
  round: ProtectedRound;
  resources: ProposalResource[];
  oecd_fos_2007_code: string;
  oecd_fos_2007_label: string;
  reviews: ProposalReview[];
}

export interface CallOffering {
  url: string;
  uuid: string;
  attributes: AttributesType;
  call: string;
  call_name: string;
  created_by_email: string;
  created_by_name: string;
  description: string;
  offering: string;
  offering_uuid: string;
  offering_name: string;
  provider_name: string;
  state: CallOfferingState;
  category_name?: string;
  plan: string;
  plan_details: Plan;
  options?: Offering['options'];
  components?: Offering['components'];
}

export interface CallOfferingFormData {
  offering: Offering;
  attributes: AttributesType;
  description: string;
  plan: Plan;
  limits?: Limits;
}

export interface ProposalResource {
  attributes: AttributesType;
  created_by: string;
  created_by_name: string;
  description: string;
  requested_offering: CallOffering;
  resource: any;
  url: string;
  uuid: string;
}

export interface ProposalResourceFormData {
  offering: CallOffering & { requested_offering_uuid: string };
  attributes: AttributesType;
  plan: Plan;
  limits?: Limits;
}

export interface ProposalReview {
  url: string;
  uuid: string;
  proposal: string;
  reviewer: string;
  reviewer_full_name: string;
  state: ReviewState;
  summary_score: number;
  summary_public_comment: string;
  summary_private_comment: string;
  proposal_name: string;
  review_end_date: string;
  round_uuid: string;
  round_name: string;
  call_name: string;
  call_uuid: string;
}
