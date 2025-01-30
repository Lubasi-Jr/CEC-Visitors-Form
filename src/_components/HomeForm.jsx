import React, { useReducer, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ACTIONS = {
  UPDATE_FIELD: "update_field",
  RESET_FORM: "reset_field",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS.RESET_FORM:
      return action.payload;
    default:
      return state;
  }
}

const HomeForm = () => {
  //const [radioItem, setRadioItem] = useState("");
  const navigate = useNavigate();

  const [notClickable, setNotClickable] = useState(false);
  const STATES = {
    first: "",
    last: "",
    company: "",
    addy: "",
    email: "",
    phone: "",
    idType: "NRC",
    nrc: "",
  };

  const [formState, dispatch] = useReducer(reducer, STATES);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      payload: {
        field: id,
        value,
      },
    });
  };

  const handleRadioChange = (value) => {
    //console.log("Selected ID Type: ", value);
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      payload: {
        field: "idType",
        value,
      },
    });
  };

  const resetFields = () => {
    dispatch({ type: ACTIONS.RESET_FORM, payload: STATES });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setNotClickable(true);

    //Do all regex checks, use toast.error where you find an error
    // Validate First Name: No numbers allowed
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formState.first)) {
      toast.error(
        "First Name should not contain numbers or special characters."
      );
      setNotClickable(false);
      return; // Stop the submission if first name is invalid
    }

    // Validate Last Name: No numbers allowed
    if (!nameRegex.test(formState.last)) {
      toast.error(
        "Last Name should not contain numbers or special characters."
      );
      setNotClickable(false);
      return; // Stop the submission if last name is invalid
    }

    // Validate Email: Check for a valid email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address.");
      setNotClickable(false);
      return; // Stop the submission if email is invalid
    }

    // Validate NRC if ID Type is "NRC"
    if (formState.idType === "NRC") {
      const nrcRegex = /^\d{5}\/\d{2}\/\d{1}$/;
      if (!nrcRegex.test(formState.nrc)) {
        toast.error("NRC should be in the format: 12345/12/3");
        setNotClickable(false);
        return; // Stop the submission if NRC is invalid
      }
    }

    //Convert number to string
    formState.phone = formState.phone.toString();

    console.log("NO ERRORS, Proceed with submission");

    //Submission body

    const updatedBody = {
      first_name: formState.first,
      last_name: formState.last,
      address: formState.addy,
      company_name: formState.company,
      email: formState.email,
      phone: formState.phone,
      id_type: formState.idType,
      id_number: formState.nrc,
      verified_visitor: true,
      created_at: new Date().toISOString(),
    };
    //console.log(newVisitorBody);

    try {
      const response = await axiosInstance.post("/Visitors/CreateVisitor", {
        first_name: formState.first,
        last_name: formState.last,
        address: formState.addy,
        company_name: formState.company,
        email: formState.email,
        phone: formState.phone,
        id_type: formState.idType,
        id_number: formState.nrc,
        verified_visitor: false,
        created_at: new Date().toISOString(),
      });
      console.log("New Visitor Created: ", response.data);
      setNotClickable(false);
      navigate("/submit");
    } catch (error) {
      console.log(error);
      toast.error("A server side error occurred while submitting");
      console.log(updatedBody);

      setNotClickable(false);
    }
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="z-10 w-full md:w-4/5 bg-white rounded-md h-auto px-10 py-10 mx-auto flex flex-col items-start gap-2">
        <div className="flex gap-12 items-start justify-start w-auto mb-12">
          <img
            src="cec-OG-logo-transparent.png"
            alt="CEC Logo"
            height={100}
            width={100}
          />

          <h1 className="font-bold text-3xl mt-5 md:mt-8">Visitors Form</h1>
        </div>

        <form
          onSubmit={handleClick}
          className="grid w-full grid-cols-1 md:grid-cols-2 px-5 py-5 gap-4"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first">First Name</Label>
            <Input
              type="text"
              id="first"
              placeholder="Name"
              value={formState.first}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last">Last Name</Label>
            <Input
              type="text"
              id="last"
              placeholder="Last Name"
              value={formState.last}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Company Name</Label>
            <Input
              type="text"
              id="company"
              placeholder="Company"
              value={formState.company}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Textarea
              placeholder="Type your address here"
              id="addy"
              value={formState.addy}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="number"
              id="phone"
              placeholder="Phone"
              value={formState.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ID Type">ID Type</Label>
            <RadioGroup defaultValue="NRC" onValueChange={handleRadioChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NRC" id="nrc" />
                <Label htmlFor="nrc">NRC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Passport" id="passport" />
                <Label htmlFor="passport">Passport</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="ID">ID Number</Label>
            <Input
              type="text"
              id="nrc"
              placeholder="ID Number"
              value={formState.nrc}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-[250px]" disabled={notClickable}>
            Submit
          </Button>
          <Button
            type="button"
            className="w-[250px] border border-black text-black"
            variant="outline"
            onClick={resetFields}
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HomeForm;
