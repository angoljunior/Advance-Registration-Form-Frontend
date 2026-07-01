import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import registrationIcon from "./registration icon-Photoroom.png";
import linkdelnIcon from "./linkdeln icon.jfif";
import WhatsAppIcon from "./WhatsApp_Icon.png";
import { toast } from "sonner";

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

  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegistration = async (payment_reference = null) => {
    setLoading(true);

    try {
      await axios.post("registrations/", {
        ...formData,
        engineering_discipline:
          formData.engineering_discipline === "other"
            ? formData.engineering_discipline_other
            : formData.engineering_discipline,
        payment_reference: payment_reference,
      });

      toast.success("Registration completed successfully.");

      setFormData({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone_number: "",
        institution: "",
        engineering_discipline: "",
        ghie_membership_status: "",
        attendance_type: "normal",
      });
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("BACKEND ERROR:", error.response?.data);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again.",
      );
    }
  };

  const handlePaystackPayment = () => {
    if (!formData.email) {
      toast.error("Please enter your email before making payment.");
      return;
    }

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: 100 * 100, //make it 100 cedis
      currency: "GHS",

      metadata: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        attendance_type: formData.attendance_type,
      },

      onSuccess: (transaction) => {
        submitRegistration(transaction.reference);
      },

      onCancel: () => {
        toast.error("Payment was cancelled.");
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.attendance_type === "vvip") {
      handlePaystackPayment();
    } else {
      submitRegistration();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10 mx-auto">
      <div className="mb-8 flex flex-col items-center text-center">
        {/* GhIE Logo */}
        <img
          src={registrationIcon}
          alt="GhIE Logo"
          className="mb-4 h-20 w-20 object-contain"
        />

        <a href="https://chat.whatsapp.com/JJDOxtYmAxzBijoVqbGRB5?s=cl&p=a&mlu=0">
          <img
            src={WhatsAppIcon}
            alt="GhIE Logo"
            className="mb-4 h-20 w-20 object-contain"
          />
        </a>

        <a href="https://www.linkedin.com/in/ghana-institution-of-engineering-ghie-umat-srid-chapter-206439373?utm_source=share_via&utm_content=profile&utm_medium=member_android">
          <img
            src={linkdelnIcon}
            alt="GhIE Logo"
            className="mb-4 h-20 w-20 object-contain"
          />
        </a>

        <h1 className="text-2xl font-bold">
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
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender optional" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
              required
            />

            <datalist id="engineering-disciplines">
              <option value="Electrical Engineering" />
              <option value="Mechanical Engineering" />
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
                setFormData({ ...formData, attendance_type: value })
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
              VVIP registration requires payment of GHS 100.00 <br />
              Comes with these packages <br />
              -Summit Branded T-Shirt <br />
              -Certificate of Participation <br />
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
              {loading
                ? "Processing..."
                : formData.attendance_type === "vvip"
                  ? "Make Payment"
                  : "Submit Registration"}
            </Button>
          </Field>
        </FieldGroup>

        <Field className="mt-4 text-center items-center text-sm text-muted-foreground ">
          <FieldDescription>
            GhIE-UMaT SRID All rights & reserved 2026 Venue: UMaT-SRID
            Quadrangle || Time: 8:00 AM
          </FieldDescription>
        </Field>
      </form>
    </div>
  );
};

export default Form;
