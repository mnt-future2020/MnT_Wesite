import {
  AudioLinesIcon,
  BotIcon,
  Building2Icon,
  CableIcon,
  ChartColumnIcon,
  CloudIcon,
  LayersIcon,
  MonitorSmartphoneIcon,
  PenToolIcon,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";
import type { ServiceAreaId } from "@/content/site";

/** One icon per service area, shared by the navbar's Services menu and the Services page. */
export const areaIcons: Record<ServiceAreaId, LucideIcon> = {
  "ai-automation": BotIcon,
  "voice-ai": AudioLinesIcon,
  "enterprise-software": Building2Icon,
  "saas-product-engineering": LayersIcon,
  "web-mobile-apps": MonitorSmartphoneIcon,
  "ui-ux": PenToolIcon,
  "api-integration": CableIcon,
  "data-bi": ChartColumnIcon,
  "cloud-devops": CloudIcon,
  cybersecurity: ShieldCheckIcon,
};
