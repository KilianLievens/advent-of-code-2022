package main

import "testing"

func TestDayTwelveWithExampleInput(t *testing.T) {
	res := DayTwelve("../input/12_1-example-input.txt", false)
	expected := 31
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayTwelveWithActualInput(t *testing.T) {
	res := DayTwelve("../input/12_1-actual-input.txt", false)
	expected := 462
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayTwelvePartTwoWithExampleInput(t *testing.T) {
	res := DayTwelve("../input/12_1-example-input.txt", true)
	expected := 29
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayTwelvePartTwoWithActualInput(t *testing.T) {
	res := DayTwelve("../input/12_1-actual-input.txt", true)
	expected := 451
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}
