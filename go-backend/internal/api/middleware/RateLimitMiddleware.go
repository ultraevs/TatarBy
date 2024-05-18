package middleware

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"net/http"
	"time"
)

func RateLimiterMiddleware() gin.HandlerFunc {
	limiter := rate.NewLimiter(rate.Every(time.Minute/10), 1000)

	return func(c *gin.Context) {
		if !limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"status": 429,
				"error":  "Too many requests",
			})
			return
		}
		c.Next()
	}
}
