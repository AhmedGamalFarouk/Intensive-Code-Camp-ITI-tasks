import 'package:flutter/material.dart';
import 'package:to_do_list_app/data/app_data.dart';

class TaskContainer extends StatefulWidget {
  final String task;
  final String time;
  final int taskTypeId;
  final int currentIndex;
  final Function upperWidgetState;

  const TaskContainer({
    super.key,
    required this.task,
    required this.time,
    required this.taskTypeId,
    required this.currentIndex,
    required this.upperWidgetState,
  });

  @override
  State<TaskContainer> createState() => _TaskContainerState();
}

class _TaskContainerState extends State<TaskContainer> {
  bool isChecked = false;

  @override
  void didUpdateWidget(covariant TaskContainer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.task != oldWidget.task ||
        widget.time != oldWidget.time ||
        widget.taskTypeId != oldWidget.taskTypeId) {
      isChecked = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: widget.taskTypeId == 1
              ? Theme.of(context)
                  .colorScheme
                  .primary
                  .withAlpha((255 * 0.2).round())
              : Colors.transparent,
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withAlpha((255 * 0.04).round()),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
          BoxShadow(
            color: Colors.black.withAlpha((255 * 0.02).round()),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          if (widget.taskTypeId == 0)
            Container(
              margin: const EdgeInsets.only(right: 16),
              child: Transform.scale(
                scale: 1.2,
                child: Checkbox(
                  value: isChecked,
                  onChanged: (value) {
                    setState(() {
                      isChecked = value!;
                      if (isChecked) {
                        Future.delayed(const Duration(milliseconds: 400), () {
                          datalist[1].data.add(
                                TaskModel(task: widget.task, time: widget.time),
                              );
                          datalist[widget.taskTypeId]
                              .data
                              .removeAt(widget.currentIndex);
                          widget.upperWidgetState();
                        });
                      }
                    });
                  },
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(6),
                  ),
                  activeColor: Theme.of(context).colorScheme.primary,
                  checkColor: Colors.white,
                  side: BorderSide(
                    color: Theme.of(context)
                        .colorScheme
                        .primary
                        .withAlpha((255 * 0.6).round()),
                    width: 2,
                  ),
                ),
              ),
            ),
          if (widget.taskTypeId != 0)
            Container(
              margin: const EdgeInsets.only(right: 16),
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: widget.taskTypeId == 1
                    ? Theme.of(context)
                        .colorScheme
                        .primary
                        .withAlpha((255 * 0.1).round())
                    : Colors.red.withAlpha((255 * 0.1).round()),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                widget.taskTypeId == 1
                    ? Icons.check_circle_rounded
                    : Icons.delete_rounded,
                color: widget.taskTypeId == 1
                    ? Theme.of(context).colorScheme.primary
                    : Colors.red,
                size: 20,
              ),
            ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.task,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        decoration: widget.taskTypeId == 1
                            ? TextDecoration.lineThrough
                            : null,
                        decorationColor: Theme.of(context).colorScheme.primary,
                        decorationThickness: 2,
                        color: widget.taskTypeId == 1
                            ? Colors.grey[600]
                            : widget.taskTypeId == 2
                                ? Colors.grey[500]
                                : Colors.grey[800],
                      ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(
                      Icons.schedule_rounded,
                      size: 16,
                      color: Theme.of(context)
                          .colorScheme
                          .primary
                          .withAlpha((255 * 0.7).round()),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      widget.time,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: Theme.of(context)
                                .colorScheme
                                .primary
                                .withAlpha((255 * 0.8).round()),
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            width: 4,
            height: 40,
            decoration: BoxDecoration(
              color: widget.taskTypeId == 0
                  ? Theme.of(context)
                      .colorScheme
                      .primary
                      .withAlpha((255 * 0.3).round())
                  : widget.taskTypeId == 1
                      ? Colors.green.withAlpha((255 * 0.3).round())
                      : Colors.red.withAlpha((255 * 0.3).round()),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ],
      ),
    );
  }
}
