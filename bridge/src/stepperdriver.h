#pragma once

#include <Arduino.h>
#include <SPI.h>

#include <TMC429.h>

#include "config.h"
#include "types.h"

class StepperDriver
{
public:
    typedef struct
    {
        uint32_t velocityMinHz;
        uint32_t velocityMaxHz;
        uint32_t acceleration_max_hz_per_s;
    } Limit_t;

    typedef struct
    {
        u32_t pos;
        bool isMoving;
    } Stepper_t;

    //------------------------------------------------------------------------------
    StepperDriver() : tmc429_()
    //------------------------------------------------------------------------------
    {
    }

    //------------------------------------------------------------------------------
    bool setup(uint8_t pinCS, uint8_t clockMHz, Limit_t limits[3])
    //------------------------------------------------------------------------------
    {
        tmc429_.setup(pinCS, clockMHz);
        if (tmc429_.communicating())
        {
            tmc429_.initialize();
            tmc429_.disableRightSwitches();
            tmc429_.setSwitchesActiveLow();

            for (uint8_t i = 0; i < 3; ++i)
            {
                initMotor(i, &(limits[i]));
            }

            return true;
        }
    }

    //------------------------------------------------------------------------------
    void loop()
    //------------------------------------------------------------------------------
    {
        TMC429::Status s = tmc429_.getStatus();
        steppers_[0].isMoving = !s.at_target_position_0;
        steppers_[1].isMoving = !s.at_target_position_1;
        steppers_[2].isMoving = !s.at_target_position_2;
        for (uint8_t i = 0; i < 3; ++i)
        {
            steppers_[i].pos.int32 = tmc429_.getActualPosition(i);
        }
    }

    //------------------------------------------------------------------------------
    void StepperDriver::initMotor(uint8_t axisIndex, Limit_t *limit)
    //------------------------------------------------------------------------------
    {
        tmc429_.stop(axisIndex); // velocity mode, speed 0
        tmc429_.setLimitsInHz(axisIndex, limit->velocityMinHz, limit->velocityMaxHz, limit->acceleration_max_hz_per_s);
        tmc429_.setActualPosition(axisIndex, 0);
        tmc429_.setTargetPosition(axisIndex, 0);
        tmc429_.disableLeftSwitchStop(axisIndex);
        tmc429_.disableRightSwitchStop(axisIndex);
        tmc429_.disableSwitchSoftStop(axisIndex);

        tmc429_.setSoftMode(axisIndex);
    }

    void setPos(uint8_t axisIndex, const u32_t &value)
    {
        tmc429_.setSoftMode(axisIndex);
        tmc429_.setTargetPosition(axisIndex, value.int32);
    }
    void setVelocity(uint8_t axisIndex, const u32_t &value)
    {
        tmc429_.setVelocityMode(axisIndex);
        tmc429_.setTargetVelocityInHz(axisIndex, value.int32);
    }
    void setLimit(uint8_t axisIndex, const Limit_t &limit)
    {
        tmc429_.setLimitsInHz(axisIndex, limit.velocityMinHz, limit.velocityMaxHz, limit.acceleration_max_hz_per_s);
    }

    bool isMoving(const uint8_t axisIndex) const { return steppers_[axisIndex].isMoving; }
    const u32_t &getPos(const uint8_t axisIndex) const { return steppers_[axisIndex].pos; }

private:
    TMC429 tmc429_;
    Stepper_t steppers_[3];
};