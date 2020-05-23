#pragma once

#include <Arduino.h>

typedef union {
    uint16_t uint16;
    int16_t int16;
    uint8_t bytes[2];
} u16_t;

typedef union {
    uint32_t uint32;
    int32_t int32;
    float float32;
    float double32;
    uint8_t bytes[4];
} u32_t;

typedef union {
    uint64_t uint64;
    int64_t int64;
    uint8_t bytes[8];
} u64_t;
