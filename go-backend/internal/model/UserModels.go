package model

import "database/sql"

type UserInfo struct {
	Email string         `json:"email"`
	Name  string         `json:"name"`
	Photo sql.NullString `json:"photo_url"`
}

type NewNickname struct {
	Nickname string `json:"nickname"`
}
