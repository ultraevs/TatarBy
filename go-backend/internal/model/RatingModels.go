package model

type Rating struct {
	NickName string `json:"nickname"`
	Score    uint   `json:"score"`
}

type UserRating struct {
	NickName string `json:"nickname"`
}
