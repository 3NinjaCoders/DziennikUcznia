package com.dziennik.view;

public class TeacherMsgListView {

	private Long idteacher;
	private String teacherName;
	private String subject;
	private int hasNewMessage;
	
	public TeacherMsgListView() {
	}

	public TeacherMsgListView(Long idteacher, String teacherName, String subject, int hasNewMessage) {
		this.idteacher = idteacher;
		this.teacherName = teacherName;
		this.subject = subject;
		this.hasNewMessage = hasNewMessage;
	}

	public Long getIdteacher() {
		return idteacher;
	}

	public void setIdteacher(Long idteacher) {
		this.idteacher = idteacher;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getHasNewMessage() {
		return hasNewMessage;
	}

	public void setHasNewMessage(int hasNewMessage) {
		this.hasNewMessage = hasNewMessage;
	}

	@Override
	public String toString() {
		return "TeacherMsgListView [idteacher=" + idteacher + ", teacherName=" + teacherName + ", subject=" + subject
				+ ", hasNewMessage=" + hasNewMessage + "]";
	}
}
