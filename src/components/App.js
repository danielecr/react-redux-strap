import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../actionTypes";

const Username = ({userdata}) => (
	<p>{userdata.name} {userdata.surname}</p>
)

export default function App() {
	const dispatch = useDispatch();
	const userdata = useSelector(s=>s.userdata);
	useEffect(()=>{
		dispatch({type: actionTypes.USERDATA_LOAD})
	},[])
	return (
		<div>
		<h1>Simple React App</h1>
		<p>Here load data from "remote":</p>
		{userdata.name?<Username userdata={userdata} />:null}
		</div>
	);
}
