package database

import "github.com/muhreeowki/midwifery-ehr/internal/models"

/* CreateMidwife creates a new midwife record in the database. */
func (engine *DatabaseEngine) CreateMidwife(midwife *models.Midwife) (err error) {
	err = engine.DB.Create(midwife).Error
	return err
}

/* GetMidwife retrieves a midwife record from the database. */
func (engine *DatabaseEngine) GetMidwife(id float64) (midwife models.Midwife, err error) {
	err = engine.DB.Where("ID = ?", id).First(&midwife).Error
	return midwife, err
}

// TODO: Implement Authorization middleware, then create GetMidwife, UpdateMidwife, and DeleteMidwife functions.