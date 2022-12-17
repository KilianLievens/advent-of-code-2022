package main

import (
	"log"
	"os"
	"strings"
)

func main() {
	res := DaySeventeen("../input/17_1-example-input.txt")
	log.Println(res)
}

type block struct {
	pieces []*position
}

var inputBlocks = [5]block{
	{
		// Horizontal line
		pieces: []*position{
			{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0},
		},
	},
	{
		// Cross
		pieces: []*position{
			{x: 3, y: 0}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 3, y: 2},
		},
	},
	{
		// Mirrored L
		pieces: []*position{
			{x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2},
		},
	},
	{
		// Vertical line
		pieces: []*position{
			{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3},
		},
	},
	{
		// Square
		pieces: []*position{
			{x: 2, y: 0}, {x: 2, y: 1}, {x: 3, y: 0}, {x: 3, y: 1},
		},
	},
}

func spawnBlock(blockTemplate block, verticalHeight int) block {
	var pieces []*position

	for _, templatePiece := range blockTemplate.pieces {
		pieces = append(pieces, &position{x: templatePiece.x, y: templatePiece.y + verticalHeight})
	}

	return block{pieces: pieces}
}

func checkCollision(pos position, fixedPieces *map[position]bool) bool {
	_, ok := (*fixedPieces)[pos]
	if ok {
		return true
	}
	return false
}

func checkMoveBlockDown(block *block, fixedPieces *map[position]bool) (collision bool) {
	for _, piece := range block.pieces {
		if piece.y <= 0 {
			// log.Println("Found bottom")
			return true
		}

		if checkCollision(position{x: piece.x, y: piece.y - 1}, fixedPieces) {
			return true
		}
	}

	return false
}

func moveBlockDown(block *block, fixedPieces *map[position]bool) {
	for _, piece := range block.pieces {
		piece.y = piece.y - 1
	}
}

func checkMoveBlockHorizontal(block *block, direction string, width int, fixedPieces *map[position]bool) (collision bool) {
	if direction == "<" {
		for _, piece := range block.pieces {
			if piece.x <= 0 {
				return true
			}

			if checkCollision(position{x: piece.x - 1, y: piece.y}, fixedPieces) {
				return true
			}
		}
		return false
	}

	if direction == ">" {
		for _, piece := range block.pieces {
			if piece.x >= width-1 {
				return true
			}

			if checkCollision(position{x: piece.x + 1, y: piece.y}, fixedPieces) {
				return true
			}
		}
		return false
	}

	log.Panicln("Found incorrect direction")
	return false
}

func moveBlockHorizontal(block *block, direction string) {
	if direction == "<" {
		for _, piece := range block.pieces {
			piece.x = piece.x - 1
		}

		return
	}

	if direction == ">" {
		for _, piece := range block.pieces {
			piece.x = piece.x + 1
		}

		return
	}

	log.Panicln("Found incorrect direction")
}

func printIt(fixedPieces []position, highestY int) {
	for y := highestY; y >= 0; y-- {
		line := ""
		for x := 0; x < 7; x++ {
			foundIt := false
			for _, fp := range fixedPieces {
				if fp.x == x && fp.y == y {
					foundIt = true
				}
			}
			if foundIt {
				line = line + "#"
				continue
			}
			line = line + "."
		}
		log.Println(line)
	}
}

func DaySeventeen(filePath string) int {
	body, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}

	var directions []string

	for _, line := range strings.Split(string(body), "\n") {
		if line == "" {
			continue
		}

		directions = strings.Split(line, "")

		break
	}

	var fixedPieces = make(map[position]bool)
	var highestY = -1
	var dI = 0

	for bI := 0; bI < 1000000000000; bI++ {
		if bI%100_000 == 0 {
			log.Println("Starting block", bI, int(bI/1000000000000*100))
		}

		hitBottom := false
		newBlock := spawnBlock(inputBlocks[bI%len(inputBlocks)], highestY+4)

		for hitBottom == false {
			direction := directions[dI%len(directions)]
			dI++

			hCollision := checkMoveBlockHorizontal(&newBlock, direction, 7, &fixedPieces)
			if !hCollision {
				moveBlockHorizontal(&newBlock, direction)
			}

			vCollision := checkMoveBlockDown(&newBlock, &fixedPieces)
			if vCollision {
				for _, newPiece := range newBlock.pieces {
					fixedPieces[*newPiece] = true
				}

				hitBottom = true
				continue
			}

			moveBlockDown(&newBlock, &fixedPieces)
		}

		for _, nBP := range newBlock.pieces {
			if nBP.y > highestY {
				highestY = nBP.y
			}
		}

		// printIt(fixedPieces, highestY)
	}

	return highestY + 1
}
