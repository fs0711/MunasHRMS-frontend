import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TinySlider,
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "@/base-components";
import { faker as $f } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCLients, createClient } from "../../store/actions";

function Main() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated );
  const clients = useSelector((state) => state.client.clients)
  const [headerFooterModalPreview, setHeaderFooterModal] =
  useState(false);
  const [headerFooterModalPreview1, setHeaderFooterModal1] =
  useState(false);

  if(!isAuthenticated)
  {
    return navigate('/home');
  }
  
  useEffect(() => {

    dispatch(getAllCLients());

    console.log(clients)

  }, [dispatch, clients]);

// Define state variables
const [clientName, setClientName] = useState("");
const [contactPerson, setContactPerson] = useState("");
const [cpNumber, setCpNumber] = useState([]);
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [country, setCountry] = useState("");
const [zipCode, setZipCode] = useState("");
const [cpEmail, setCpEmail] = useState("");
const [numberOfSites, setNumberOfSites] = useState(0);

const handleSubmit = (event) => {
  event.preventDefault();

  dispatch(createClient(clientName, contactPerson, cpNumber, address, city, country, zipCode, cpEmail, numberOfSites ))

  setClientName('');
  setContactPerson('');
  setCpNumber([]);
  setAddress('');
  setCity('');
  setCountry('');
  setZipCode('');
  setCpEmail('');
  setNumberOfSites(0);
};

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Clients Section</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button 
          onClick={() => {
            setHeaderFooterModal(true);
          }}
          className="btn btn-primary shadow-md mr-2"
          >
            Add New Client
          </button>
         {/* <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div> */}
        </div>
        {/* BEGIN: Users Layout */}
        {clients.map((client, clientKey) => (
          <div
          key={clientKey}
          className="intro-y col-span-12 md:col-span-6 lg:col-span-4"
        >
          <div className="box">
            <div className="flex items-start px-5 pt-5">
              <div className="w-full flex flex-col lg:flex-row items-center">
               
                <div className="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                  <a 
                   className="font-medium"
                   onClick={() => {
                    setHeaderFooterModal1(true);
                  }}
                  >
                    {client.name}
                  </a>
                  <div className="text-slate-500 text-xs mt-0.5">
                    {client.client_id}
                  </div>
                </div>
              </div>
              <Dropdown className="absolute right-0 top-0 mr-5 mt-3">
                <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                  <Lucide
                    icon="MoreHorizontal"
                    className="w-5 h-5 text-slate-500"
                  />
                </DropdownToggle>
                <DropdownMenu className="w-40">
                  <DropdownContent>
                    <DropdownItem>
                      <Lucide icon="Edit2" className="w-4 h-4 mr-2" /> Edit
                    </DropdownItem>
                    <DropdownItem>
                      <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="text-center lg:text-left p-5">
              <div></div>
              <div className="flex items-center justify-center lg:justify-start text-slate-500 mt-5">
                <Lucide icon="Mail" className="w-3 h-3 mr-2" />
                {client.cp_email_address}
              </div>
            </div>
            {/*<div className="text-center lg:text-right p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <button className="btn btn-primary py-1 px-2 mr-2">
                Message
              </button>
              <button className="btn btn-outline-secondary py-1 px-2">
                Profile
              </button>
              </div> */}
          </div>
        </div>
        ))}
        {/* BEGIN: Users Layout */}
                  {/* BEGIN: Header & Footer Modal */}
                  <PreviewComponent>
                  {({ toggle }) => (
                    <>
                     
                          {/* BEGIN: Modal Toggle 
                          <div className="text-center">
                            <a
                              href="#"
                              onClick={() => {
                                setHeaderFooterModalPreview(true);
                              }}
                              className="btn btn-primary"
                            >
                              Show Modal
                            </a>
                          </div>
                          {/* END: Modal Toggle */}
                          {/* BEGIN: Modal Content */}
                          <Modal
                            show={headerFooterModalPreview}
                            onHidden={() => {
                              setHeaderFooterModal(false);
                            }}
                          >
                            <ModalHeader>
                              <h2 className="font-medium text-base mr-auto">
                                New Client Form
                              </h2>
                             
                            </ModalHeader>
                            <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
                            <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-1" className="form-label">
                              Client Name
                            </label>
                            <input
                              id="modal-form-1"
                              type="text"
                              className="form-control"
                              placeholder="Client Name"
                              value={clientName}
                              onChange={(e) => setClientName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-2" className="form-label">
                              Contact Person
                            </label>
                            <input
                              id="modal-form-2"
                              type="text"
                              className="form-control"
                              placeholder="Contact Person"
                              value={contactPerson}
                              onChange={(e) => setContactPerson(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-3" className="form-label">
                              CP No.
                            </label>
                            <input
                              id="modal-form-3"
                              type="text"
                              className="form-control"
                              placeholder="+923xxxxxxxxx"
                              value={cpNumber}
                              onChange={(e) => setCpNumber([e.target.value])}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-4" className="form-label">
                              Address
                            </label>
                            <input
                              id="modal-form-4"
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-5" className="form-label">
                              City
                            </label>
                            <input
                              id="modal-form-5"
                              type="text"
                              className="form-control"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-6" className="form-label">
                              Country
                            </label>
                            <input
                              id="modal-form-6"
                              type="text"
                              className="form-control"
                              placeholder="Country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-7" className="form-label">
                              Zip Code
                            </label>
                            <input
                              id="modal-form-7"
                              type="text"
                              className="form-control"
                              placeholder="Zip Code"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-8" className="form-label">
                              CP Email
                            </label>
                            <input
                              id="modal-form-8"
                              type="text"
                              className="form-control"
                              placeholder="CP Email"
                              value={cpEmail}
                              onChange={(e) => setCpEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label htmlFor="modal-form-9" className="form-label">
                              No. of Sites
                            </label>
                            <input
                              id="modal-form-9"
                              type="number"
                              className="form-control"
                              placeholder="No. of Sites"
                              value={numberOfSites}
                              onChange={(e) => setNumberOfSites(parseInt(e.target.value))}
                              required
                            />
                          </div>
                            </ModalBody>
                            <ModalFooter>
                              <button
                                type="button"
                                onClick={() => {
                                  setHeaderFooterModal(false);
                                }}
                                className="btn btn-outline-secondary w-20 mr-1"
                              >
                                Cancel
                              </button>
                              <button 
                              type="button" 
                              className="btn btn-primary w-20"
                              onClick={handleSubmit}
                              >
                                Create
                              </button>
                            </ModalFooter>
                          </Modal>
                          {/* END: Modal Content */}
                       
                        <Source>
                          <Highlight>
                           
                          </Highlight>
                        </Source>
                    
                    </>
                  )}
                </PreviewComponent>
                {/* END: Header & Footer Modal */}
                {/* BEGIN: Header & Footer Modal */}
                <PreviewComponent>
                {({ toggle }) => (
                  <>
                   
                        {/* BEGIN: Modal Toggle 
                        <div className="text-center">
                          <a
                            href="#"
                            onClick={() => {
                              setHeaderFooterModalPreview(true);
                            }}
                            className="btn btn-primary"
                          >
                            Show Modal
                          </a>
                        </div>
                        {/* END: Modal Toggle */}
                        {/* BEGIN: Modal Content */}
                        <Modal
                          show={headerFooterModalPreview1}
                          onHidden={() => {
                            setHeaderFooterModal1(false);
                          }}
                        >
                          <ModalHeader>
                            <h2 className="font-medium text-base mr-auto">
                              Site Preview
                            </h2>
                           
                          </ModalHeader>
                          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
                          <table className="col-span-12 min-w-full divide-y divide-gray-200">
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="py-2 pr-4 font-bold">Site Name</td>
                              <td className="py-2 pl-4">siteName</td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4 font-bold">Client Name</td>
                              <td className="py-2 pl-4">clientName</td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4 font-bold">Site ID</td>
                              <td className="py-2 pl-4">siteID</td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4 font-bold">Contact</td>
                              <td className="py-2 pl-4">contact</td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4 font-bold">Address</td>
                              <td className="py-2 pl-4">address</td>
                            </tr>
                          </tbody>
                        </table>
                        
                        </ModalBody>
                        
                          <ModalFooter>
                            <button
                              type="button"
                              onClick={() => {
                                setHeaderFooterModal1(false);
                              }}
                              className="btn btn-outline-secondary w-20 mr-1"
                            >
                              Cancel
                            </button>
                
                          </ModalFooter>
                        </Modal>
                        {/* END: Modal Content */}
                     
                      <Source>
                        <Highlight>
                         
                        </Highlight>
                      </Source>
                  
                  </>
                )}
              </PreviewComponent>
              {/* END: Header & Footer Modal */}
      </div>
    </>
  );
}

export default Main;
