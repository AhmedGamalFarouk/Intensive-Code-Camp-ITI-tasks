import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:to_do_list_app/data/app_data.dart';
import 'package:to_do_list_app/widgets/task_container.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final _timeTextController = TextEditingController();
  final _taskTextController = TextEditingController();
  var formKey = GlobalKey<FormState>();

  void setStatter() {
    setState(() {});
  }

  Widget _buildEmptyState() {
    String message;
    IconData icon;

    switch (_selectedIndex) {
      case 0:
        message = "No tasks yet!\nTap the + button to add your first task";
        icon = Icons.assignment_outlined;
        break;
      case 1:
        message =
            "No completed tasks yet!\nComplete some tasks to see them here";
        icon = Icons.check_circle_outline;
        break;
      case 2:
        message = "No deleted tasks\nDeleted tasks will appear here";
        icon = Icons.delete_outline;
        break;
      default:
        message = "No tasks available";
        icon = Icons.inbox_outlined;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 80,
            color: Colors.grey[400],
          ),
          const SizedBox(height: 24),
          Text(
            message,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: _selectedIndex == 0
          ? Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                gradient: LinearGradient(
                  colors: [
                    Theme.of(context).colorScheme.primary,
                    Theme.of(context)
                        .colorScheme
                        .primary
                        .withAlpha((255 * 0.8).round())
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Theme.of(context)
                        .colorScheme
                        .primary
                        .withAlpha((255 * 0.3).round()),
                    blurRadius: 12,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              child: FloatingActionButton(
                onPressed: () => showTaskDialoge(context),
                backgroundColor: Colors.transparent,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                child: const Icon(
                  Icons.add_rounded,
                  size: 28,
                  color: Colors.white,
                ),
              ),
            )
          : null,
      backgroundColor: Theme.of(context).colorScheme.surface,
      appBar: AppBar(
        title: Text(
          'TaskFlow',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
        ),
        centerTitle: true,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Theme.of(context).colorScheme.primary,
                Theme.of(context)
                    .colorScheme
                    .primary
                    .withAlpha((255 * 0.8).round())
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
        elevation: 0,
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Theme.of(context).colorScheme.primary,
                  Theme.of(context)
                      .colorScheme
                      .primary
                      .withAlpha((255 * 0.8).round())
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: const BorderRadius.only(
                bottomLeft: Radius.circular(32),
                bottomRight: Radius.circular(32),
              ),
              boxShadow: [
                BoxShadow(
                  color: Theme.of(context)
                      .colorScheme
                      .primary
                      .withAlpha((255 * 0.2).round()),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                for (int i = 0; i < datalist.length; i++)
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedIndex = i;
                        });
                      },
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                        margin: const EdgeInsets.symmetric(horizontal: 6),
                        height: 48,
                        decoration: BoxDecoration(
                          color: _selectedIndex == i
                              ? Colors.white
                              : Colors.white.withAlpha((255 * 0.1).round()),
                          borderRadius: BorderRadius.circular(24),
                          border: _selectedIndex == i
                              ? null
                              : Border.all(
                                  color: Colors.white
                                      .withAlpha((255 * 0.3).round()),
                                  width: 1,
                                ),
                          boxShadow: _selectedIndex == i
                              ? [
                                  BoxShadow(
                                    color: Colors.black
                                        .withAlpha((255 * 0.1).round()),
                                    blurRadius: 8,
                                    offset: const Offset(0, 4),
                                  ),
                                ]
                              : null,
                        ),
                        child: Center(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                i == 0
                                    ? Icons.pending_actions_rounded
                                    : i == 1
                                        ? Icons.check_circle_rounded
                                        : Icons.delete_rounded,
                                size: 18,
                                color: _selectedIndex == i
                                    ? Theme.of(context).colorScheme.primary
                                    : Colors.white
                                        .withAlpha((255 * 0.9).round()),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                datalist[i].taskType,
                                style: TextStyle(
                                  color: _selectedIndex == i
                                      ? Theme.of(context).colorScheme.primary
                                      : Colors.white
                                          .withAlpha((255 * 0.9).round()),
                                  fontWeight: FontWeight.w600,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
          Expanded(
            child: datalist[_selectedIndex].data.isEmpty
                ? _buildEmptyState()
                : Padding(
                    padding: const EdgeInsets.all(20),
                    child: ListView.builder(
                      physics: const BouncingScrollPhysics(),
                      itemCount: datalist[_selectedIndex].data.length,
                      itemBuilder: (context, i) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 16),
                          child: Slidable(
                            endActionPane: ActionPane(
                              motion: const ScrollMotion(),
                              children: [
                                if (_selectedIndex != 2)
                                  SlidableAction(
                                    onPressed: (context) {
                                      setState(() {
                                        if (_selectedIndex == 0 ||
                                            _selectedIndex == 1) {
                                          datalist[2].data.add(
                                                TaskModel(
                                                  task: datalist[_selectedIndex]
                                                      .data[i]
                                                      .task,
                                                  time: datalist[_selectedIndex]
                                                      .data[i]
                                                      .time,
                                                ),
                                              );
                                          datalist[_selectedIndex]
                                              .data
                                              .removeAt(i);
                                        }
                                      });
                                    },
                                    backgroundColor: const Color(0xFFEF4444),
                                    foregroundColor: Colors.white,
                                    icon: Icons.delete_rounded,
                                    label: "Delete",
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                if (_selectedIndex == 2)
                                  SlidableAction(
                                    onPressed: (context) {
                                      setState(() {
                                        datalist[0].data.add(
                                              TaskModel(
                                                task: datalist[_selectedIndex]
                                                    .data[i]
                                                    .task,
                                                time: datalist[_selectedIndex]
                                                    .data[i]
                                                    .time,
                                              ),
                                            );
                                        datalist[_selectedIndex]
                                            .data
                                            .removeAt(i);
                                      });
                                    },
                                    backgroundColor: const Color(0xFF10B981),
                                    foregroundColor: Colors.white,
                                    icon: Icons.restore_rounded,
                                    label: "Restore",
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                if (_selectedIndex == 0)
                                  SlidableAction(
                                    onPressed: (context) {
                                      showTaskDialoge(context, index: i);
                                    },
                                    backgroundColor:
                                        Theme.of(context).colorScheme.primary,
                                    foregroundColor: Colors.white,
                                    icon: Icons.edit_rounded,
                                    label: "Edit",
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                              ],
                            ),
                            child: TaskContainer(
                              task: datalist[_selectedIndex].data[i].task,
                              time: datalist[_selectedIndex].data[i].time,
                              taskTypeId: datalist[_selectedIndex].taskTypeId,
                              currentIndex: i,
                              upperWidgetState: setStatter,
                            ),
                          ),
                        );
                      },
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Future<dynamic> showTaskDialoge(BuildContext context, {int? index}) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
          ),
          titlePadding: const EdgeInsets.all(0),
          title: Container(
            padding: const EdgeInsets.all(24.0),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Theme.of(context).colorScheme.primary,
                  Theme.of(context)
                      .colorScheme
                      .primary
                      .withAlpha((255 * 0.8).round())
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
              ),
            ),
            child: Text(
              "${index == null ? "Add" : "Update"} Task",
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
              textAlign: TextAlign.center,
            ),
          ),
          content: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: _taskTextController,
                    decoration: InputDecoration(
                      hintText: "Enter task name",
                      filled: true,
                      fillColor: Theme.of(context).colorScheme.surface,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: BorderSide.none,
                      ),
                      prefixIcon: Icon(
                        Icons.task_alt_rounded,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 16,
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Please enter a task name";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20),
                  GestureDetector(
                    onTap: () async {
                      TimeOfDay? selectedTime = await showTimePicker(
                        context: context,
                        initialTime: TimeOfDay.now(),
                        builder: (context, child) {
                          return Theme(
                            data: Theme.of(context).copyWith(
                              colorScheme: ColorScheme.light(
                                primary: Theme.of(context).colorScheme.primary,
                                onPrimary: Colors.white,
                                onSurface:
                                    Theme.of(context).colorScheme.primary,
                              ),
                              textButtonTheme: TextButtonThemeData(
                                style: TextButton.styleFrom(
                                  foregroundColor:
                                      Theme.of(context).colorScheme.primary,
                                ),
                              ),
                            ),
                            child: child!,
                          );
                        },
                      );
                      if (selectedTime != null) {
                        setState(() {
                          _timeTextController.text =
                              selectedTime.format(context);
                        });
                      }
                    },
                    child: AbsorbPointer(
                      child: TextFormField(
                        controller: _timeTextController,
                        decoration: InputDecoration(
                          hintText: "Select time",
                          filled: true,
                          fillColor: Theme.of(context).colorScheme.surface,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(16),
                            borderSide: BorderSide.none,
                          ),
                          prefixIcon: Icon(
                            Icons.schedule_rounded,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 16,
                          ),
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return "Please select a time";
                          }
                          return null;
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          actionsAlignment: MainAxisAlignment.center,
          actionsPadding: const EdgeInsets.all(16),
          actions: [
            Row(
              children: [
                Expanded(
                  child: TextButton(
                    onPressed: () => Navigator.pop(context),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Text(
                      "Cancel",
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      if (formKey.currentState!.validate()) {
                        if (index != null) {
                          setState(() {
                            datalist[_selectedIndex].data[index] = TaskModel(
                              task: _taskTextController.text,
                              time: _timeTextController.text,
                            );
                          });
                        } else {
                          setState(() {
                            datalist[0].data.add(
                                  TaskModel(
                                    task: _taskTextController.text,
                                    time: _timeTextController.text,
                                  ),
                                );
                          });
                        }
                        Navigator.pop(context);
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.zero,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Ink(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            Theme.of(context).colorScheme.primary,
                            Theme.of(context)
                                .colorScheme
                                .primary
                                .withAlpha((255 * 0.8).round())
                          ],
                          begin: Alignment.centerLeft,
                          end: Alignment.centerRight,
                        ),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        alignment: Alignment.center,
                        child: Text(
                          index == null ? "Add Task" : "Update Task",
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        );
      },
    );
  }
}
