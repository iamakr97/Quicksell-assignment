import React from 'react';
import './KanbanCard.css';

function KanbanCard({ ticket }) {

    return (
        <div className="kanban-card">
            <p className="ticket-id">{ticket.id}</p>
            <p className="ticket-title">{ticket.title}</p>
            <div className="tags-container">
                {ticket.tag.map((t, index) => (
                    <span key={index} className="tag">
                        <span className="gray-dot"></span> 
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default KanbanCard;
