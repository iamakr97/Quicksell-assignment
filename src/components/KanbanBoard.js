import React, { useState } from 'react';
import './KanbanBoard.css';
import displayImg from '../assets/icons_FEtask/Display.svg';
import downArrow from '../assets/icons_FEtask/down.svg';
import KanbanCard from './KanbanCard';

// status svg
import backlogSvg from '../assets/icons_FEtask/Backlog.svg';
import todoSvg from '../assets/icons_FEtask/To-do.svg';
import inProgressSvg from '../assets/icons_FEtask/in-progress.svg';
import cancelledSvg from '../assets/icons_FEtask/Cancelled.svg';
import doneSvg from '../assets/icons_FEtask/Done.svg';

// priority svg
import noPrioritySvg from '../assets/icons_FEtask/No-priority.svg';
import urgentSvg from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import highSvg from '../assets/icons_FEtask/Img - High Priority.svg';
import mediumSvg from '../assets/icons_FEtask/Img - Medium Priority.svg';
import lowSvg from '../assets/icons_FEtask/Img - Low Priority.svg';

import addSvg from '../assets/icons_FEtask/add.svg';
import threeDotSvg from '../assets/icons_FEtask/3 dot menu.svg';


function KanbanBoard({ tickets, users }) {
    const group = localStorage.getItem('group') || "status";
    const order = localStorage.getItem('order') || "title";
    const [grouping, setGrouping] = useState(group);
    const [ordering, setOrdering] = useState(order);
    const [display, setDisplay] = useState(false);

    const displayBtnHandler = () => {
        setDisplay(!display);
    };

    const handleGrouping = (e) => {
        setGrouping(e.target.value);
        localStorage.setItem('group', e.target.value);
        setDisplay(!display);
    };

    const handleOrdering = (e) => {
        setOrdering(e.target.value);
        localStorage.setItem('order', e.target.value);
        setDisplay(!display);
    };

    const statusIcons = {
        Backlog: backlogSvg,
        Todo: todoSvg,
        'In progress': inProgressSvg,
        Done: doneSvg,
        Cancelled: cancelledSvg,
    };

    const priorityIcons = {
        'No Priority': noPrioritySvg,
        Urgent: urgentSvg,
        High: highSvg,
        Medium: mediumSvg,
        Low: lowSvg,
    };

    const getGroupedTickets = () => {
        const groupedTickets = {};

        if (grouping === 'status') {
            const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
            statuses.forEach((status) => {
                groupedTickets[status] = tickets.filter(ticket => ticket.status === status);
            });
        } else if (grouping === 'priority') {
            const priorities = [
                { level: 0, label: "No Priority" },
                { level: 4, label: "Urgent" },
                { level: 3, label: "High" },
                { level: 2, label: "Medium" },
                { level: 1, label: "Low" },
            ];
            priorities.forEach(({ level, label }) => {
                groupedTickets[label] = tickets.filter(ticket => ticket.priority === level);
            });
        } else if (grouping === 'user') {
            users.forEach(user => {
                groupedTickets[user.name] = tickets.filter(ticket => ticket.userId === user.id);
            });
        }

        return groupedTickets;
    };

    const sortTickets = (tickets) => {
        return tickets.sort((a, b) => {
            if (ordering === 'title') {
                return a.title.localeCompare(b.title);
            } else if (ordering === 'priority') {
                return b.priority - a.priority;
            }
            return 0;
        });
    };

    const groupedTickets = getGroupedTickets();

    const getAvatarUrl = (userName) => {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;
    };

    return (
        <div className='kanban-container'>
            <div className='kanban-header-container'>
                <div className="display-dropdown">
                    <button className='display-btn' onClick={displayBtnHandler}>
                        <img src={displayImg} alt="Display" />
                        <span>Display</span>
                        <img src={downArrow} alt="Down Arrow" />
                    </button>
                </div>

                {display && (
                    <div className="display-popup">
                        <div className='popup-item'>
                            <label>Grouping</label>
                            <select value={grouping} onChange={handleGrouping}>
                                <option value="status">Status</option>
                                <option value="priority">Priority</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className='popup-item'>
                            <label>Ordering</label>
                            <select value={ordering} onChange={handleOrdering}>
                                <option value="title">Title</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="kanban-groups">
                {Object.keys(groupedTickets).map((groupKey) => (
                    <div key={groupKey} className="kanban-group">
                        <div>
                            {grouping === 'user' ? (
                                <div>
                                    <div className='filter-group-heading'>
                                        <div className='filter-group-div'>
                                            <img src={getAvatarUrl(groupKey)} alt={groupKey} className="user-avatar" />
                                            <p>{groupKey} <span>{groupedTickets[groupKey].length}</span></p>
                                        </div>
                                        <div className='filter-group-img'>
                                            <img src={addSvg} alt="add" />
                                            <img src={threeDotSvg} alt="3 dot" />
                                        </div>
                                    </div>
                                    <div className="kanban-cards">
                                        {sortTickets(groupedTickets[groupKey]).map(ticket => (
                                            <KanbanCard
                                                key={ticket.id}
                                                ticket={ticket}
                                                users={users}
                                                avatarUrl={getAvatarUrl(users.find(user => user.id === ticket.userId)?.name || 'Unknown')} // Pass avatar URL
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='filter-group-heading'>
                                        <div className='filter-group-div'>
                                            <img src={grouping === 'status' ? statusIcons[groupKey] : priorityIcons[groupKey]} alt={groupKey} />
                                            <p>{groupKey} <span>{groupedTickets[groupKey].length}</span></p>
                                        </div>
                                        <div className='filter-group-img'>
                                            <img src={addSvg} alt="add" />
                                            <img src={threeDotSvg} alt="3 dot" />
                                        </div>
                                    </div>
                                    <div className="kanban-cards">
                                        {sortTickets(groupedTickets[groupKey]).map(ticket => (
                                            <KanbanCard
                                                key={ticket.id}
                                                ticket={ticket}
                                                users={users}
                                                avatarUrl={getAvatarUrl(users.find(user => user.id === ticket.userId)?.name || 'Unknown')} // Pass avatar URL
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default KanbanBoard;
