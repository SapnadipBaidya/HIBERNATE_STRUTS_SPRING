package com.practice.model;

public class DataModel {
	private Integer sl_id;
	private String username;
	private String email;
	private String password;
	private Boolean newUser;
	private String cpass;
	private Boolean success;

	public DataModel() {
		super();
		this.success = false;
	}

	public Integer getSl_id() {
		return sl_id;
	}

	public void setSl_id(Integer sl_id) {
		this.sl_id = sl_id;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getCpass() {
		return cpass;
	}

	public void setCpass(String cpass) {
		this.cpass = cpass;
	}

	public Boolean getNewUser() {
		return newUser;
	}

	public void setNewUser(Boolean newUser) {
		this.newUser = newUser;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
