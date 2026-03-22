import { z } from "zod";

// SOS Alert Schema
export const SOSAlertSchema = z.object({
  patientId: z.string().uuid(),
  latitude: z.number(),
  longitude: z.number(),
  status: z.enum(["active", "resolved", "cancelled"]),
  timestamp: z.string().datetime(),
});

export type SOSAlert = z.infer<typeof SOSAlertSchema>;

// Patient Profile Schema
export const PatientProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    required_error: "Please select a blood group.",
  }),
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().min(10, { message: "Enter a valid 10-digit phone number." }),
});

export type PatientProfile = z.infer<typeof PatientProfileSchema>;
