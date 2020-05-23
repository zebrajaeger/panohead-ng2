#pragma once

#if __has_include("config.h")
#include "config.h"
#endif

#ifndef CS_PIN
#define CS_PIN 1
#endif

#ifndef TMC_CLOCK_MHZ
#define TMC_CLOCK_MHZ 16
#endif

#ifndef I2C_ADDRESS
#define I2C_ADDRESS 99
#endif