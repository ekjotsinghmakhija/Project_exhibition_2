package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// Upgrader configures how we transition from HTTP to WebSockets
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true }, // Allow all for dev
}

// Hub manages the active connections
type Hub struct {
	clients    map[*websocket.Conn]bool
	broadcast  chan []byte
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	mu         sync.Mutex
}

func newHub() *Hub {
	return &Hub{
		clients:    make(map[*websocket.Conn]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
			log.Println("New client connected")

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				client.Close()
			}
			h.mu.Unlock()
			log.Println("Client disconnected")

		case message := <-h.broadcast:
			h.mu.Lock()
			for client := range h.clients {
				err := client.WriteMessage(websocket.TextMessage, message)
				if err != nil {
					log.Printf("error: %v", err)
					client.Close()
					delete(h.clients, client)
				}
			}
			h.mu.Unlock()
		}
	}
}

func main() {
	hub := newHub()
	go hub.run()

	// WebSocket Route
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("Upgrade error: %v", err)
			return
		}
		hub.register <- conn
	})

	// Trigger SOS Route (Simulated)
	http.HandleFunc("/api/trigger-sos", func(w http.ResponseWriter, r *http.Request) {
		msg := map[string]interface{}{
			"type":      "NEW_SOS",
			"patient":   "Ekjot",
			"lat":       23.10,
			"lng":       75.22,
			"condition": "Cardiac",
		}
		data, _ := json.Marshal(msg)
		hub.broadcast <- data
		w.Write([]byte(`{"status": "SOS Broadcasted"}`))
	})

	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status": "Go Backend is Online"}`))
	})

	fmt.Println("Sanjeevani Go Server (WS Enabled) running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
