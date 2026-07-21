import React, { useState } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import linkdelnIcon from "./linkdeln icon.jfif";
import WhatsAppIcon from "./WhatsApp_Icon.png";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Form = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone_number: "",
    institution: "",
    engineering_discipline: "",
    engineering_discipline_other: "",
    ghie_membership_status: "",
    attendance_type: "normal",
  });

  const [loading, setLoading] = useState(false);

  // Controls the VVIP payment popup
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Stores response from backend after registration
  const [registeredAttendee, setRegisteredAttendee] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
   ==========================================
   SUBMIT REGISTRATION TO DJANGO BACKEND
   ==========================================
  */

  const submitRegistration = async () => {
    setLoading(true);

    try {
      const response = await axios.post("registrations/", {
        ...formData,
      });

      // Save returned registration information
      setRegisteredAttendee(response.data);

      /*
       ==========================================
       VVIP REGISTRATION
       ==========================================
      */

      if (formData.attendance_type === "vvip") {
        toast.success("Registration details saved successfully.");

        // Show MoMo payment instructions
        setShowPaymentModal(true);
      } else {
        /*
       ==========================================
       NORMAL REGISTRATION
       ==========================================
      */
        toast.success("Registration completed successfully.");

        // Clear the form
        setFormData({
          first_name: "",
          last_name: "",
          gender: "",
          email: "",
          phone_number: "",
          institution: "",
          engineering_discipline: "",
          engineering_discipline_other: "",
          ghie_membership_status: "",
          attendance_type: "normal",
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   ==========================================
   FORM SUBMISSION
   ==========================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    submitRegistration();
  };

  /*
   ==========================================
   CLOSE PAYMENT POPUP
   ==========================================
  */

  const closePaymentModal = () => {
    setShowPaymentModal(false);

    // Clear form after user closes payment instructions
    setFormData({
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      phone_number: "",
      institution: "",
      engineering_discipline: "",
      engineering_discipline_other: "",
      ghie_membership_status: "",
      attendance_type: "normal",
    });

    setRegisteredAttendee(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 mx-auto">
      <div className="flex flex-col items-center mb-8 text-center">
        {/* Main Logo */}

        <h1 className="max-w-2xl text-2xl font-bold text-center">
          GhIE-UMaT SRID Engineering Summit Registration Form
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="first_name">First Name</FieldLabel>

              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="last_name">Last Name</FieldLabel>

              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Field>
          </div>

          <Field>
            <FieldLabel>Gender</FieldLabel>

            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({
                  ...formData,

                  gender: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender optional" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>

                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldDescription>This field is optional.</FieldDescription>
          </Field>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>

              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="+233 24 000 0000"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </Field>
          </div>

          <div className="flex gap-2">
            <Checkbox id="terms" required />

            <Label htmlFor="terms" className="text-gray-400">
              I confirm that the email address provided is correct and will be
              used for all summit communications and my QR ticket.
            </Label>
          </div>

          <Field>
            <FieldLabel htmlFor="institution">Institution</FieldLabel>

            <Input
              id="institution"
              name="institution"
              type="text"
              placeholder="Enter institution or company"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="engineering_discipline">
              Programme of Study
            </FieldLabel>

            <Input
              id="engineering_discipline"
              name="engineering_discipline"
              type="text"
              list="engineering-disciplines"
              placeholder="Type or choose your programme"
              value={formData.engineering_discipline}
              onChange={handleChange}
            />

            <datalist id="engineering-disciplines">
              <option value="Electrical Engineering" />

              <option value="Mechanical Engineering" />

              <option value="Geological Engineering" />

              <option value="Civil Engineering" />

              <option value="Data Science" />

              <option value="Computer Engineering" />

              <option value="Mining Engineering" />

              <option value="Chemical Engineering" />

              <option value="Petroleum Engineering" />

              <option value="Environmental and Safety Engineering" />

              <option value="Geomatic Engineering" />
            </datalist>
          </Field>

          <Field>
            <FieldLabel>GhIE Membership Status</FieldLabel>

            <Select
              value={formData.ghie_membership_status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,

                  ghie_membership_status: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select membership status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="member">GhIE Member</SelectItem>

                  <SelectItem value="non_member">Non-Member</SelectItem>

                  <SelectItem value="student_member">Graduate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Attendance Type</FieldLabel>

            <Select
              value={formData.attendance_type}
              onValueChange={(value) =>
                setFormData({
                  ...formData,

                  attendance_type: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose attendance type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="normal">Normal</SelectItem>

                  <SelectItem value="vvip">VVIP - GHS 100.0</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FieldDescription>
              VVIP registration requires payment of GHS 100.00
              <br />
              Comes with
              <br />
              -Summit Branded T-Shirt
              <br />
              -Certificate of Participation
              <br />
              -Access to Event
            </FieldDescription>
          </Field>

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  first_name: "",

                  last_name: "",

                  gender: "",

                  email: "",

                  phone_number: "",

                  institution: "",

                  engineering_discipline: "",

                  engineering_discipline_other: "",

                  ghie_membership_status: "",

                  attendance_type: "normal",
                })
              }
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {formData.attendance_type === "vvip"
                ? "Continue to Payment"
                : "Submit Registration"}
            </Button>
          </Field>
        </FieldGroup>

        {/* Social Icons */}

        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <a
            href="https://chat.whatsapp.com/JJDOxtYmAxzBijoVqbGRB5?s=cl&p=a&mlu=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-20 h-20 transition border rounded-full hover:scale-105"
          >
            <img
              src={WhatsAppIcon}
              alt="WhatsApp"
              className="object-contain h-7 w-7"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/ghana-institution-of-engineering-ghie-umat-srid-chapter-206439373?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-20 h-20 transition border rounded-full hover:scale-105"
          >
            <img
              src={linkdelnIcon}
              alt="LinkedIn"
              className="object-contain h-7 w-7"
            />
          </a>
        </div>

        <p className="justify-center max-w-xl mt-1 text-center text-muted-foreground">
          Follow our social media channels for all official summit updates
        </p>

        <div className="flex flex-col items-center justify-center w-full mt-6 text-center">
          <p className="max-w-xl text-[0.8rem] text-muted-foreground">
            GhIE-UMaT SRID All rights reserved 2026
          </p>

          <p className="mt-1 max-w-xl text-[0.8rem] text-muted-foreground">
            Venue: UMaT-SRID Quadrangle || Time: 8:00 AM || 25th July, 2026
          </p>
        </div>
      </form>

      {/* ==========================================
          VVIP PAYMENT POPUP
      ========================================== */}

      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-xl">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold">VVIP Payment Instructions</h2>

              <p className="mt-2 text-sm text-gray-500">
                Your registration details have been saved successfully. Please
                make your VVIP payment using the details below.
              </p>
            </div>

            <div className="p-4 space-y-3 rounded-lg bg-gray-50">
              <div>
                <p className="text-sm text-gray-500">Amount</p>

                <p className="font-semibold">GHS 100.00</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Mobile Money Number</p>

                <p className="font-semibold">0598355879</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Network</p>

                <p className="font-semibold">MTN Mobile Money</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Account Name</p>

                <p className="font-semibold">Nana Kofi Junior Angol</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Payment Reference: Engineering Summit{" "}
                </p>

                <p className="font-semibold">
                  {registeredAttendee?.attendee_id ||
                    `${formData.first_name} ${formData.last_name}`}
                </p>
              </div>
            </div>

            <div className="p-3 mt-4 border rounded-lg border-amber-200 bg-amber-50">
              <p className="text-sm text-amber-800">
                Please use your Attendee ID or full name as your payment
                reference when making the payment.
              </p>
            </div>

            <Button
              type="button"
              className="w-full mt-5"
              onClick={closePaymentModal}
            >
              I Understand
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
