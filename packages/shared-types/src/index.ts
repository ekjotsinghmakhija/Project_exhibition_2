import { z } from "zod";

export const SOSAlertSchema = z.object({
  patientId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  status: z.enum(["active", "resolved", "cancelled"]),
  timestamp: z.string().datetime(),
});

export type SOSAlert = z.infer<typeof SOSAlertSchema>;
