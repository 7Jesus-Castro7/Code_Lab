let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let events = JSON.parse(localStorage.getItem('events')) || [];

        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        function renderCalendar() {
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';
            
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            for (let i = 0; i < firstDay; i++) {
                calendar.innerHTML += '<div></div>';
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = ${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')};
                const dayEvents = events.filter(event => event.date === dateStr);

                calendar.innerHTML += `<div onclick="showEvents('${dateStr}')">
                    ${day}<br>${dayEvents.length ? '🌱' : ''}
                </div>`;
            }
        }

        function navigateMonth(step) {
            currentMonth += step;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            document.getElementById('current-month').innerText = ${monthNames[currentMonth]} ${currentYear};
            renderCalendar();
        }

        function addEvent() {
            const crop = document.getElementById('crop').value;
            const area = document.getElementById('area').value;
            const date = document.getElementById('date').value;

            if (!crop || !area || !date) {
                alert('Por favor complete todos los campos.');
                return;
            }

            events.push({ crop, area, date });
            localStorage.setItem('events', JSON.stringify(events));
            alert('Evento agregado.');
            renderCalendar();
            renderEventList();
        }

        function showEvents(date) {
            const dayEvents = events.filter(event => event.date === date);
            alert(dayEvents.map(event => ${event.crop}: ${event.area} ha).join('\n') || 'No hay eventos para este día.');
        }

        function renderEventList() {
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = '<h2>Eventos</h2>';

            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'event';
                eventDiv.innerText = ${event.date} - ${event.crop} (${event.area} ha);
                eventList.appendChild(eventDiv);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('current-month').innerText = ${monthNames[currentMonth]} ${currentYear};
            renderCalendar();
            renderEventList();
        });