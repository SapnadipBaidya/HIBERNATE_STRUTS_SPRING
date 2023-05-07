package com.practice.action;

import org.apache.catalina.core.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.practice.manager.APImanager;
import com.practice.model.DataModel;

public class APIaction {
	private DataModel jsonString;

	public DataModel getJsonString() {
		return jsonString;
	}

	public void setJsonString(DataModel dataModelParser) {
		this.jsonString = dataModelParser;
	}

	private String data;

	public void setData(String data) {
		this.data = data;
	}

	public String doPost() {
		ClassPathXmlApplicationContext appContext = new ClassPathXmlApplicationContext("ApplicationContext.xml");

		System.out.println("incoming data " + data);
		System.out.println("APIaction doPost start");

		try {
			ObjectMapper mapper = new ObjectMapper();
			APImanager apimanager = (APImanager) appContext.getBean("apimanager");
			DataModel response = apimanager.doPost(data);
			System.out.println("APIaction " + response.getUsername());
			String JsonString = mapper.writeValueAsString(response);

			System.out.println("response data " + JsonString);
			DataModel dataModelParser = mapper.readValue(JsonString, DataModel.class);
			setJsonString(dataModelParser);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("error is api action");
			e.printStackTrace();
		}
		System.out.println("APIaction doPost end");
		return "success";
	}
}
