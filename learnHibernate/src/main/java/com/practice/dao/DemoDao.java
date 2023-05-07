package com.practice.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.practice.connection.DBconnection;
import com.practice.model.DataModel;

public class DemoDao {

	public DataModel RegisterUser(String userName, String password, String email) throws Exception {

		ResultSet rs = null;
		DataModel dm = new DataModel();
		try {
			System.out.println("doPost RegisterUser  start");
	
			Configuration cfg = new Configuration();
			cfg.configure("hibernate.cfg.xml");
			SessionFactory sf = cfg.buildSessionFactory();
			Session session = sf.openSession();
			Transaction transaction = null;

			transaction = session.beginTransaction();
			Query query = session.createQuery("FROM DataModel WHERE email = :email");
			query.setParameter("email", email);
			DataModel entity = (DataModel) query.uniqueResult();
		

			if (entity != null) {
				System.out.println("presense of data");
				dm.setEmail(entity.getEmail());
				dm.setPassword(entity.getPassword());
				dm.setUsername(entity.getUsername());
				dm.setNewUser(false);
				dm.setSuccess(true);
				System.out.println("hibernate " + entity.getEmail() + " " + entity);
			} if(entity == null) {
				
				System.out.println(" new insertion of data");
				dm.setEmail(email);
				dm.setPassword(password);
				dm.setUsername(userName);
				dm.setSuccess(true);
				dm.setNewUser(true);
				session.save(dm);
			}

			// Commit the transaction and close the session
			transaction.commit();
			session.close();
			// Execute the query

		} catch (Exception e) {
			System.out.println(e);
		} finally {
			System.out.println("doPost RegisterUser  end");
			System.out.println(dm.getUsername() + " " + dm.getEmail() + " " + dm.getPassword());
			return dm;

		}

		// step 4 -> execute query

	}

}
