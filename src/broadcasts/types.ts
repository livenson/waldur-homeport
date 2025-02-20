interface Message {
  subject: string;
  body: string;
}

export interface MessageTemplate extends Message {
  uuid: string;
}

export interface IdNamePair {
  name: string;
  uuid: string;
}

interface Broadcast extends Message {
  send_at: string;
}

export interface BroadcastFormData extends Broadcast {
  customers: IdNamePair[];
  offerings: IdNamePair[];
  all_users: boolean;
}

interface QueryRequest {
  customers: string[];
  offerings: string[];
  all_users: boolean;
}

interface QueryResponse {
  customers: IdNamePair[];
  offerings: IdNamePair[];
  projects: IdNamePair[];
  all_users: boolean;
}

export interface BroadcastRequestData extends Broadcast {
  query: QueryRequest;
}

export interface BroadcastResponseData extends Broadcast {
  uuid: string;
  query: QueryResponse;
  emails: string[];
  created: string;
  state: string;
  author_full_name: string;
}
