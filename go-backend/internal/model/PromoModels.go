package model

type NewPromo struct {
	Email  string `json:"email"`
	Result string `json:"result"`
}

type Promo struct {
	PromoCode string `json:"promo_code"`
}
