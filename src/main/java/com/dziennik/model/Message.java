package com.dziennik.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Message {

	@Id
	@GeneratedValue
	private Long id;
	private Long fromid;
	private Long toid;
	@Column(name = "date", columnDefinition="TIMESTAMP")
	private Timestamp timestampmsg;
	private int isread;
	@Lob
	private String msg;
	
	public Message() {
	}

	public Message(Long fromid, Long toid, Timestamp timestampmsg, int isread, String msg) {
		this.fromid = fromid;
		this.toid = toid;
		this.timestampmsg = timestampmsg;
		this.isread = isread;
		this.msg = msg;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFromid() {
		return fromid;
	}

	public void setFromid(Long fromid) {
		this.fromid = fromid;
	}

	public Long getToid() {
		return toid;
	}

	public void setToid(Long toid) {
		this.toid = toid;
	}

	public Timestamp getTimestampmsg() {
		return timestampmsg;
	}

	public void setTimestampmsg(Timestamp timestampmsg) {
		this.timestampmsg = timestampmsg;
	}

	public int getIsread() {
		return isread;
	}

	public void setIsread(int isread) {
		this.isread = isread;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", fromid=" + fromid + ", toid=" + toid + ", timestampmsg=" + timestampmsg
				+ ", isread=" + isread + ", msg=" + msg + "]";
	}
}
