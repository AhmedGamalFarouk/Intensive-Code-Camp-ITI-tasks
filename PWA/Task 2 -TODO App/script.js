document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const taskNameInput = document.getElementById('task-name');
    const taskTimeInput = document.getElementById('task-time');
    const taskDateInput = document.getElementById('task-date');
    const todoList = document.getElementById('todo-list');

    let tasks = [];
    let db;

    function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('TodoDB', 1);
            
            request.onerror = () => {
                console.error('Database failed to open');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                db = request.result;
                console.log('Database opened successfully');
                resolve(db);
            };
            
            request.onupgradeneeded = (e) => {
                db = e.target.result;
                
                const objectStore = db.createObjectStore('tasks', {
                    keyPath: 'name'
                });
                
                objectStore.createIndex('date', 'date', { unique: false });
                objectStore.createIndex('time', 'time', { unique: false });
                objectStore.createIndex('completed', 'completed', { unique: false });
                objectStore.createIndex('notified', 'notified', { unique: false });
                
                console.log('Database setup complete');
            };
        });
    }
    
    function saveTaskToDB(task) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['tasks'], 'readwrite');
            const objectStore = transaction.objectStore('tasks');
            const request = objectStore.put(task);
            
            request.onsuccess = () => {
                console.log('Task saved to database:', task.name);
                resolve();
            };
            
            request.onerror = () => {
                console.error('Error saving task:', request.error);
                reject(request.error);
            };
        });
    }
    
    function loadTasksFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['tasks'], 'readonly');
            const objectStore = transaction.objectStore('tasks');
            const request = objectStore.getAll();
            
            request.onsuccess = () => {
                tasks = request.result;
                console.log('Tasks loaded from database:', tasks.length);
                resolve(tasks);
            };
            
            request.onerror = () => {
                console.error('Error loading tasks:', request.error);
                reject(request.error);
            };
        });
    }
    
    function deleteTaskFromDB(taskName) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['tasks'], 'readwrite');
            const objectStore = transaction.objectStore('tasks');
            const request = objectStore.delete(taskName);
            
            request.onsuccess = () => {
                console.log('Task deleted from database:', taskName);
                resolve();
            };
            
            request.onerror = () => {
                console.error('Error deleting task:', request.error);
                reject(request.error);
            };
        });
    }
    
    function getTaskFromDB(taskName) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['tasks'], 'readonly');
            const objectStore = transaction.objectStore('tasks');
            const request = objectStore.get(taskName);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                console.error('Error getting task:', request.error);
                reject(request.error);
            };
        });
    }

    function requestNotificationPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications.');
            showNotificationStatus('Browser does not support notifications');
            return;
        }
        
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                updateNotificationStatus(permission);
            });
        } else {
            updateNotificationStatus(Notification.permission);
        }
    }
    
    function updateNotificationStatus(permission) {
        if (permission === 'granted') {
            showNotificationStatus('✅ Notifications enabled', 'success');
        } else if (permission === 'denied') {
            showNotificationStatus('❌ Notifications blocked', 'error');
        } else {
            showNotificationStatus('⚠️ Notifications not allowed', 'warning');
        }
    }
    
    function showNotificationStatus(message, type = 'info') {
        let statusDiv = document.getElementById('notification-status');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.id = 'notification-status';
            statusDiv.style.cssText = `
                padding: 10px;
                margin: 10px 0;
                border-radius: 4px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
            `;
            document.querySelector('.container').insertBefore(statusDiv, document.querySelector('form'));
        }
        
        statusDiv.textContent = message;
        statusDiv.className = `notification-status ${type}`;
        

        const colors = {
            success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
            error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
            warning: { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
            info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
        };
        
        const style = colors[type] || colors.info;
        statusDiv.style.backgroundColor = style.bg;
         statusDiv.style.color = style.color;
         statusDiv.style.border = `1px solid ${style.border}`;
     }
     
     function showTemporaryMessage(message, type = 'info', duration = 3000) {
         const messageDiv = document.createElement('div');
         messageDiv.style.cssText = `
             position: fixed;
             top: 20px;
             right: 20px;
             padding: 15px 20px;
             border-radius: 4px;
             font-weight: bold;
             z-index: 1000;
             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
             animation: slideIn 0.3s ease-out;
         `;
         
         const colors = {
             success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
             error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
             warning: { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
             info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
         };
         
         const style = colors[type] || colors.info;
         messageDiv.style.backgroundColor = style.bg;
         messageDiv.style.color = style.color;
         messageDiv.style.border = `1px solid ${style.border}`;
         messageDiv.textContent = message;
         
         document.body.appendChild(messageDiv);
         
         setTimeout(() => {
             messageDiv.style.animation = 'slideOut 0.3s ease-in';
             setTimeout(() => {
                 if (messageDiv.parentNode) {
                     messageDiv.parentNode.removeChild(messageDiv);
                 }
             }, 300);
         }, duration);
     }

    function displayNotification(task) {
        if (Notification.permission === 'granted') {
            const notification = new Notification('📋 Task Reminder', {
                body: `${task.name} is due now!`,
                icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzI4YTc0NSIvPgo8cGF0aCBkPSJNMTYgMjRoMzJ2NGgtMzJ6IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMzJoMjR2NGgtMjR6IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgNDBoMTZ2NGgtMTZ6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
                tag: `task-${task.name}`,
                requireInteraction: true
            });
            

            setTimeout(() => {
                notification.close();
            }, 10000);
        }
    }

    async function scheduleNotification(task) {
        if (task.completed || task.notified) {
            return;
        }
        
        const taskDateTime = new Date(`${task.date}T${task.time}`);
        const now = new Date();
        const timeUntilTask = taskDateTime.getTime() - now.getTime();

        if (timeUntilTask > 0) {
            setTimeout(async () => { // 
                if (!task.completed && !task.notified) {
                    displayNotification(task);
                    task.notified = true;
                    await saveTask(task); 
                }
            }, timeUntilTask);
        } else if (timeUntilTask > -3600000 && !task.notified) {

            displayNotification(task);
            task.notified = true;
            await saveTask(task);
        }
    }

    async function saveTasks() {
        try {
            for (const task of tasks) {
                await saveTaskToDB(task);
            }
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
    
    async function saveTask(task) {
        try {
            await saveTaskToDB(task);
            const existingIndex = tasks.findIndex(t => t.name === task.name);
            if (existingIndex >= 0) {
                tasks[existingIndex] = task;
            } else {
                tasks.push(task);
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    }

    function renderTasks() {
        todoList.innerHTML = ''; 
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.dataset.name = task.name;
            listItem.classList.toggle('completed', task.completed);
            
            const taskDateTime = new Date(`${task.date}T${task.time}`);
            const now = new Date();
            const isPast = taskDateTime < now;
            const notificationIcon = task.notified ? '🔔' : (isPast ? '⏰' : '⏱️');
            
            listItem.innerHTML = `
                <span>${notificationIcon} ${task.name} - ${task.date} at ${task.time}</span>
                <button class="delete-btn">Delete</button>
            `;
            todoList.appendChild(listItem);

            listItem.querySelector('span').addEventListener('click', async () => {
                task.completed = !task.completed;
                listItem.classList.toggle('completed', task.completed);
                await saveTask(task);
            });

            listItem.querySelector('.delete-btn').addEventListener('click', async () => {
                try {
                    await deleteTaskFromDB(task.name);
                    tasks = tasks.filter(t => t.name !== task.name);
                    renderTasks(); 
                } catch (error) {
                    console.error('Error deleting task:', error);
                }
            });
        });
    }

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const existingTask = await getTaskFromDB(taskNameInput.value);
        if (existingTask) {
            showTemporaryMessage('Task with this name already exists!', 'error');
            return;
        }
        
        const newTask = {
            name: taskNameInput.value, 
            time: taskTimeInput.value,
            date: taskDateInput.value, 
            completed: false,
            notified: false 
        };
        
        try {
            await saveTask(newTask);
            renderTasks();
            scheduleNotification(newTask);
            
            showTemporaryMessage(`Task "${newTask.name}" added successfully!`, 'success');
        } catch (error) {
            console.error('Error adding task:', error);
            showTemporaryMessage('Error adding task!', 'error');
        }

        taskNameInput.value = '';
        taskTimeInput.value = '';
        taskDateInput.value = '';
    });

    async function loadTasks() {
        try {
            await loadTasksFromDB();
            renderTasks();
            tasks.forEach(task => {
                scheduleNotification(task);
            });
        } catch (error) {
            console.error('Error loading tasks:', error);
            showTemporaryMessage('Error loading tasks from database!', 'error');
        }
    }
    
    async function initApp() {
        try {
            await initDB();
            await loadTasks();
            requestNotificationPermission();
            addTestNotificationButton();
        } catch (error) {
            console.error('Error initializing app:', error);
            showTemporaryMessage('Error initializing application!', 'error');
            // Fallback to localStorage if IndexedDB fails
            tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            renderTasks();
            requestNotificationPermission();
            addTestNotificationButton();
        }
    }

    function addTestNotificationButton() {
        const statusDiv = document.getElementById('notification-status');
        if (statusDiv && !document.getElementById('test-notification-btn')) {
            const testBtn = document.createElement('button');
            testBtn.id = 'test-notification-btn';
            testBtn.className = 'test-notification-btn';
            testBtn.textContent = 'Test Notification';
            testBtn.onclick = () => {
                if (Notification.permission === 'granted') {
                    displayNotification({
                        id: 'test',
                        name: 'Test Notification',
                        date: new Date().toISOString().split('T')[0],
                        time: new Date().toTimeString().split(' ')[0].substring(0, 5)
                    });
                    showTemporaryMessage('Test notification sent!', 'success');
                } else {
                    showTemporaryMessage('Please enable notifications first', 'warning');
                }
            };
            statusDiv.appendChild(testBtn);
        }
    }
    
    function enhanceNotificationStatus() {
        const statusDiv = document.getElementById('notification-status');
        if (statusDiv && Notification.permission !== 'granted') {
            const enableBtn = document.createElement('button');
            enableBtn.textContent = 'Enable Notifications';
            enableBtn.className = 'test-notification-btn';
            enableBtn.style.marginLeft = '10px';
            enableBtn.onclick = () => {
                requestNotificationPermission();
                setTimeout(() => {
                    addTestNotificationButton();
                }, 500);
            };
            statusDiv.appendChild(enableBtn);
        }
        addTestNotificationButton();
    }

    initApp();
    
    setTimeout(() => {
        enhanceNotificationStatus();
    }, 100);
});
