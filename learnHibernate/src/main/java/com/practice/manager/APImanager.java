package com.practice.manager;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.practice.dao.DemoDao;
import com.practice.model.DataModel;

public class APImanager {
	ObjectMapper objectMapper = new ObjectMapper();
	DemoDao dataDao;
	DataModel rawResponse;

	public void setRawResponse(DataModel rawResponse) {
		this.rawResponse = rawResponse;
	}

	public void setDataDao(DemoDao dataDao) {
		this.dataDao = dataDao;
	}

	public DataModel doPost(String data) throws Exception {
		
		try {
			System.out.println("doPost manager layer start");
			String name = null;
			String password = null;
			String email = null;
			DataModel dataObj = objectMapper.readValue(data, DataModel.class);
			System.out.println(dataObj.getUsername() + ' ' + dataObj.getEmail() + " " + dataObj.getPassword());
			name = dataObj.getUsername();
			password = dataObj.getPassword();
			email = dataObj.getEmail();
			rawResponse = dataDao.RegisterUser(name, password, email);
			System.out.println("in apimanager " + rawResponse.getUsername());

		} catch (Exception e) {
			System.out.println("error in apimanager " + e);
		} finally {
			System.out.println("doPost manager layer end");
			return rawResponse;
		}
	}

}
