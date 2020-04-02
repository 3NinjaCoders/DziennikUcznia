package com.dziennik.view;

public class ClassMessageView {

	private Long idpupil;
	private String pupilName;
	private int hasNewMessage;
	
	public ClassMessageView() {
	}

	public ClassMessageView(Long idpupil, String pupilName, int hasNewMessage) {
		super();
		this.idpupil = idpupil;
		this.pupilName = pupilName;
		this.hasNewMessage = hasNewMessage;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public String getPupilName() {
		return pupilName;
	}

	public void setPupilName(String pupilName) {
		this.pupilName = pupilName;
	}

	public int getHasNewMessage() {
		return hasNewMessage;
	}

	public void setHasNewMessage(int hasNewMessage) {
		this.hasNewMessage = hasNewMessage;
	}

	@Override
	public String toString() {
		return "ClassMessageView [idpupil=" + idpupil + ", pupilName=" + pupilName + ", hasNewMessage=" + hasNewMessage
				+ "]";
	}
}
