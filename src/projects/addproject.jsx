import { Button, Card, CardBody, CardHeader, Input, Option, Select, Textarea } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'

import { useNavigate, useLocation, Link } from "react-router-dom";
import ProjectService from '../services/project-service';

export const Addproject = () => {

    const navigate = useNavigate();
    const service = ProjectService()
    const { state } = useLocation();
    const loc = useLocation();
    const [project, setProject] = useState(state?.project ?? {
        id: "",
        name: "",
        detail: "",
        lastDate: "",
        status: "",
        updated: "",
    });

    const saveToServer = async () => {
        let data = {
            id: project.id,
            name: project.name,
            detail: project.detail,
            lastDate: project.lastDate,
            status: project.status,
            created: project.created,
            updated: project.updated,
        }
        service.saveProject(data, (error) => {
            if (error) return
            navigate(-1, { state: { data: data } })
        })

    }
    useEffect(() => {
        // if (state) {
        //     setProject(state.project)
        //     // setProject({...project, updated: project.updated ?? ""})
        // }
    }, []);

    const handleInput = (e) => {
        if (e.target == undefined) {
            setProject({ ...project, status: e })
            return
        }
        const name = e.target.name;
        const value = e.target.value;
        setProject({ ...project, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        saveToServer()
    }

    return (
        <> <div className="bg-light-blue-500 px-3 md:px-8 h-32" />


            <div className='  z-0 p-4 -mt-24 min-h-screen grid grid-cols-12'>
                <div className="mt-2 md:mt-8 col-span-12 md:col-span-8 md:col-start-3">

                    <Card>
                        <CardHeader color="purple" className='p-4'>
                            <div className="w-full flex items-center justify-between">
                                <h2 className="text-white text-2xl">{state ? state.title : "Add New Project"}</h2>
                                <Link to={'/project'} >
                                    <Button size="lg" color='purple' >Back to List</Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light select-none uppercase">
                                    Project Information
                                </h6>
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full pr-4 mb-10 font-light">
                                        <input type="hidden" name="id" value={project.id} />
                                        <Input type="text" color="purple" label="Project Name"
                                            value={project.name} onChange={handleInput} name="name" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-10 font-light">
                                    <Textarea color="purple" label="Project Details"
                                        value={project.detail} onChange={handleInput} name="detail" />
                                </div>
                                <div className={(state?.title ? "" : " hidden ") + " flex flex-wrap mt-10"}>
                                    <div className="w-full lg:w-6/12 pr-4 font-light">
                                        <label htmlFor="created" className='pb-2 pl-4 text-sm text-blue-grey-600'>Created At : </label>
                                        <Input type="date" color="purple" label="Created At" id="created"
                                            value={project.created ?? ""} name="created" disabled />
                                    </div>
                                    <div className="w-full lg:w-6/12 md:pl-4 font-light">
                                        <label htmlFor="updated" className='pb-2 pl-4 text-sm text-blue-grey-600'>Last Updated At</label>
                                        <Input type="date" color="purple" label="Last Updated At" id='updated'
                                            value={project.updated ?? ""} name="updated" disabled />
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input type="date" color="purple" label="Last Date Of Submission"
                                            value={project.lastDate} onChange={handleInput} name="lastDate" />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Select variant="outlined" label="Select Status" color='purple'
                                            className="shadow  transition ease-in-out  appearance-none border rounded w-full py-2 px-3 
                                        bg-slate-50  leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={handleInput} name="status" id="status" value={project.status}
                                            autoComplete='off' placeholder="Contact" defaultValue={"DEVELOPMENT"} >
                                            <Option value="ACTIVE">Active</Option>
                                            <Option value="DEVELOPMENT">Development</Option>
                                            <Option value="COMPLETED">Completed</Option>
                                            <Option value="HOLD">Hold</Option>
                                        </Select>

                                    </div>
                                </div>
                                <div className="flex flex-wrap justify-between mt-6 font-light">
                                    <Button color="purple" variant='outlined'
                                        onClick={() => { navigate(-1) }}>Cancel</Button>
                                    <Button color="purple"
                                        onClick={handleSubmit}>Save</Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div >
            </div >
        </>
    )
}
