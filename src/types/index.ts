export type Role = "customer" | "worker" | "elder" | "admin" | "diaspora";

export type VouchRole = "Elder" | "Imam" | "Senior Worker" | "Union Council Official" | "Community Leader";

export interface VouchDetail {
  id: string;
  role: VouchRole;
  name: string;
  avatar?: string;
  voucherTitle: string;
  relationship: string;
  verifiedSince: string;
  trustScore: number;
  phoneVerified: boolean;
  notes?: string;
  riskFlag?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  beforePhoto?: string;
  afterPhoto: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  year: number;
}

export interface WorkerReview {
  id: string;
  customerName: string;
  customerCity: string;
  rating: number;
  date: string;
  comment: string;
  voiceReviewUrl?: string;
  jobType: string;
}

export interface Worker {
  id: string;
  name: string;
  avatar?: string;
  category: string;
  city: string;
  district: string;
  area: string;
  hourlyRate: number;
  fixedPriceLabel: string;
  rating: number;
  trustScore: number;
  jobsCompleted: number;
  responseRate: number;
  responseTimeMin: number;
  languages: string[];
  bio: string;
  isVerified: boolean;
  cnicVerified: boolean;
  faceVerified: boolean;
  emergencyService: boolean;
  isAvailable: boolean;
  vouches: VouchDetail[];
  portfolio?: PortfolioItem[];
  certificates?: Certificate[];
  reviews?: WorkerReview[];
  coordinates?: { lat: number; lng: number };
}

export type BookingStatus =
  | "requested"
  | "offered"
  | "accepted"
  | "en_route"
  | "in_progress"
  | "work_submitted"
  | "customer_review"
  | "completed"
  | "cancelled"
  | "disputed";

export type BookingType = "instant" | "scheduled" | "emergency" | "repeat" | "monthly";

export interface WorkProofData {
  beforePhotos: string[];
  afterPhotos: string[];
  completionNotes: string;
  gpsCheckInTime?: string;
  submittedAt: string;
}

export interface EscrowDetails {
  amount: number;
  currency: string;
  status: "funds_held" | "released" | "refunded" | "dispute_locked";
  paymentMethod: "JazzCash" | "Easypaisa" | "Bank Transfer" | "Stripe Card";
  paymentRef: string;
  heldAt: string;
  releasedAt?: string;
}

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  workerCategory: string;
  workerAvatar?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceTitle: string;
  status: BookingStatus;
  type: BookingType;
  amount: number;
  city: string;
  address: string;
  scheduledDate: string;
  isDiaspora?: boolean;
  diasporaSenderCountry?: string;
  notes?: string;
  createdAt: string;
  escrow?: EscrowDetails;
  workProof?: WorkProofData;
}

export interface JobOffer {
  id: string;
  jobId?: string;
  workerId: string;
  workerName: string;
  workerCategory?: string;
  workerAvatar?: string;
  workerTrustScore: number;
  workerRating: number;
  workerVouchesCount?: number;
  price?: number;
  bidAmount?: number;
  estimatedTime: string;
  message: string;
  voiceProposalUrl?: string;
  status?: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  customerCity: string;
  customerArea: string;
  title: string;
  category: string;
  budget: number;
  urgency: "Emergency" | "Standard" | "Flexible";
  description: string;
  voiceNoteUrl?: string;
  voiceDurationSec?: number;
  isDiaspora?: boolean;
  diasporaCountry?: string;
  status: "OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  offersCount: number;
  offers?: JobOffer[];
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  workerCount: number;
  avgHourlyRate: number;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text?: string;
  audioUrl?: string;
  audioDurationSec?: number;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ConversationItem {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface DisputeItem {
  id: string;
  bookingId: string;
  workerName: string;
  customerName: string;
  filedBy: "Customer" | "Worker";
  reason: string;
  description: string;
  amount: number;
  status: "OPEN" | "UNDER_REVIEW" | "RESOLVED_WORKER_PAID" | "RESOLVED_CUSTOMER_REFUNDED" | "RESOLVED_SPLIT";
  evidencePhotos: string[];
  createdAt: string;
  resolutionNotes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "booking" | "offer" | "escrow" | "vouch" | "dispute" | "system";
  link: string;
  isRead: boolean;
  createdAt: string;
}
