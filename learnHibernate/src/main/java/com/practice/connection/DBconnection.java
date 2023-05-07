package com.practice.connection;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBconnection {
public static Connection con = null;
	public static Connection getDBconnection() {
		// TODO Auto-generated method stub
		String url = "jdbc:mysql://localhost:3306/localSchema";
		String userName = "root";
		String password = "root";
	
		try {
			// step 1 -> register
			Class.forName("com.mysql.cj.jdbc.Driver");
//			Object ob = Class.forName("firstdemo.Demo2");
			// step 2 -> get connection // establishes connection with DB
			con = DriverManager.getConnection(url, userName, password); // url,username,password
			System.out.println(con);

//		

		} catch (Exception e) {
			System.out.println("connection could not be established");
			System.out.println(e);
		} finally {

			return con;
		}

	}

}
