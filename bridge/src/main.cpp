
#include <Wire.h>

#include "types.h"
#include "wireutils.h"
#include "stepperdriver.h"

void receiveEvent(int howMany);
void requestEvent();

// W: <Index> <Value>
// W: <Index> R: <Value>+
enum command_t
{
    writeLimit = 0,

    writeVelocity = 20,
    writePos = 21,

    readPos = 50,
    readIsMoving = 51,

    unknown = 127
};

StepperDriver stepperDriver;
command_t command_ = unknown;
uint8_t axis_ = 0;

void setup()
{
    Wire.begin(I2C_ADDRESS);
    Wire.onReceive(receiveEvent);
    Wire.onRequest(requestEvent);
    Serial.begin(115200);

    StepperDriver::Limit_t limit = {16 * 10, 200 * 16 * 7, 75000};
    StepperDriver::Limit_t limits[3] = {limit, limit, limit};
    if (stepperDriver.setup(CS_PIN, TMC_CLOCK_MHZ, limits))
    {
        Serial.println("StepperDriver initialized");
    }
    else
    {
        Serial.println("ERROR: StepperDriver NOT initialized");
    }
}

// -----------------------------------------------------------------------------
void loop()
// -----------------------------------------------------------------------------
{
    stepperDriver.loop();
}

// -----------------------------------------------------------------------------
void receiveEvent(int howMany)
// -----------------------------------------------------------------------------
{
    if (Wire.available() > 1)
    {
        command_ = (command_t)Wire.read();
        axis_ = Wire.read();
        switch (command_)
        {
        case writePos:
        {
            u32_t u32;
            if (WireUtils::read32(u32))
            {
                stepperDriver.setPos(axis_, u32);
            }
        }
        break;

        case writeVelocity:
        {
            u32_t u32;
            if (WireUtils::read32(u32))
            {
                stepperDriver.setVelocity(axis_, u32);
            }
        }
        break;

        case writeLimit:
        {
            u32_t velocityMinHz;
            u32_t velocityMaxHz;
            u32_t accelerationMaxHzPerSecond;

            if (WireUtils::read32(velocityMinHz) && WireUtils::read32(velocityMaxHz) && WireUtils::read32(accelerationMaxHzPerSecond))
            {
                StepperDriver::Limit_t limit;
                limit.velocityMinHz = velocityMinHz.uint32;
                limit.velocityMaxHz = velocityMaxHz.uint32;
                limit.acceleration_max_hz_per_s = accelerationMaxHzPerSecond.uint32;
                stepperDriver.setLimit(axis_, limit);
            }
        }
        break;
        }
    }
}

// -----------------------------------------------------------------------------
void requestEvent()
// -----------------------------------------------------------------------------
{
    switch (command_)
    {
    case readPos:
    {
        if (axis_ < 3)
        {
            WireUtils::write32(stepperDriver.getPos(axis_));
        }
    }
    break;

    case readIsMoving:
    {
        if (axis_ < 3)
        {
            WireUtils::writeBool(stepperDriver.isMoving(axis_));
        }
    }
    }
}