package models

import (
	"gorm.io/gorm"
)

type Midwife struct {
	gorm.Model
	FirstName string `json:"firstName" gorm:"not null;" binding:"required"`
	LastName  string `json:"lastName" gorm:"not null;" binding:"required"`
	Email     string `json:"email" gorm:"not null;unique" validate:"email" binding:"required"`
	Password  string `json:"password" gorm:"not null;" binding:"required"`
	ImageURL  string `json:"profileImage"`
	Patients  []Patient
}
