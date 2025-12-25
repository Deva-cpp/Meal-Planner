import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  ExternalLink,
  Home,
  Info,
  MapPin,
  Plus,
  RefreshCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  X,
  Youtube,
} from "lucide-react";

export function SearchIcon({ className }) {
  return <Search className={className} aria-hidden="true" />;
}

export function SparklesIcon({ className }) {
  return <Sparkles className={className} aria-hidden="true" />;
}

export function BagIcon({ className }) {
  return <ShoppingBag className={className} aria-hidden="true" />;
}

export function BackIcon({ className }) {
  return <ArrowLeft className={className} aria-hidden="true" />;
}

export function HomeIcon({ className }) {
  return <Home className={className} aria-hidden="true" />;
}

export function CalendarIcon({ className }) {
  return <CalendarDays className={className} aria-hidden="true" />;
}

export function RetryIcon({ className }) {
  return <RefreshCcw className={className} aria-hidden="true" />;
}

export function TrashIcon({ className }) {
  return <Trash2 className={className} aria-hidden="true" />;
}

export function CloseIcon({ className }) {
  return <X className={className} aria-hidden="true" />;
}

export function InfoIcon({ className }) {
  return <Info className={className} aria-hidden="true" />;
}

export function AlertIcon({ className }) {
  return <AlertTriangle className={className} aria-hidden="true" />;
}

export function ExternalLinkIcon({ className }) {
  return <ExternalLink className={className} aria-hidden="true" />;
}

export function YoutubeIcon({ className }) {
  return <Youtube className={className} aria-hidden="true" />;
}

export function PlusIcon({ className }) {
  return <Plus className={className} aria-hidden="true" />;
}

export function CheckIcon({ className }) {
  return <Check className={className} aria-hidden="true" />;
}

export function TagIcon({ className }) {
  return <Tag className={className} aria-hidden="true" />;
}

export function MapPinIcon({ className }) {
  return <MapPin className={className} aria-hidden="true" />;
}
