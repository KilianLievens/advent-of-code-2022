package main

import "testing"

func TestDayFourteenWithExampleInput(t *testing.T) {
	res := DayFourteen("../input/14_1-example-input.txt", false)
	expected := 24
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFourteenWithActualInput(t *testing.T) {
	res := DayFourteen("../input/14_1-actual-input.txt", false)
	expected := 768
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFourteenPartTwoWithExampleInput(t *testing.T) {
	res := DayFourteen("../input/14_1-example-input.txt", true)
	expected := 93
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFourteenPartTwoWithActualInput(t *testing.T) {
	res := DayFourteen("../input/14_1-actual-input.txt", true)
	expected := 26686
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}
