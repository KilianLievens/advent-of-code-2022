package main

import "testing"

func TestDayFifteenWithExampleInput(t *testing.T) {
	res := DayFifteen("../input/15_1-example-input.txt", 10, false, 0)
	expected := 26
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFifteenWithActualInput(t *testing.T) {
	res := DayFifteen("../input/15_1-actual-input.txt", 2000000, false, 0)
	expected := 5511201
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFifteenPartTwoWithExampleInput(t *testing.T) {
	res := DayFifteen("../input/15_1-example-input.txt", 10, true, 20)
	expected := 56000011
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayFifteenPartTwoWithActualInput(t *testing.T) {
	res := DayFifteen("../input/15_1-actual-input.txt", 10, true, 4000000)
	expected := 11318723411840
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}
