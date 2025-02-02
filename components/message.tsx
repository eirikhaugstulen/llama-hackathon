'use client';

import cx from 'classnames';
import type { Message } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import { PencilIcon, WandSparklesIcon } from 'lucide-react';


import { Markdown } from './markdown';
import equal from 'fast-deep-equal';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import DataItemsUpdate from './data-items-update';

const PurePreviewMessage = ({
    message,
    isReadonly,
}: {
  message: Message;
  isReadonly: boolean;
}) => {
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    return (
        <AnimatePresence>
            <motion.div
                className="w-full mx-auto max-w-3xl px-2 group/message"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                data-role={message.role}
            >
                <div
                    className={cn(
                        'flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl',
                        {
                            'w-full': mode === 'edit',
                            'group-data-[role=user]/message:w-fit': mode !== 'edit',
                        },
                    )}
                >
                    {message.role === 'assistant' && (
                        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
                            <div className="translate-y-px">
                                <WandSparklesIcon size={14} />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 w-full">
                        {/* {message.experimental_attachments && (
                            <div className="flex flex-row justify-end gap-2">
                                {message.experimental_attachments.map((attachment) => (
                                    <PreviewAttachment
                                        key={attachment.url}
                                        attachment={attachment}
                                    />
                                ))}
                            </div>
                        )} */}

                        {message.toolInvocations && message.toolInvocations.length > 0 && (
                            <div className="flex flex-col gap-4">
                                {message.toolInvocations.map((toolInvocation) => {
                                    const { toolName, toolCallId, state, args } = toolInvocation;

                                    if (state === 'result') {
                                        const { result } = toolInvocation;

                                        return (
                                            <div key={toolCallId}>
                                                {toolName === 'updateDataItems' ? (
                                                    <DataItemsUpdate
                                                        details={result.data}
                                                    />
                                                ) : (
                                                    <pre>{JSON.stringify(result, null, 2)}</pre>
                                                )}
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        )}

                        {message.content && mode === 'view' && (
                            <div className="flex flex-row gap-2 items-start">
                                {message.role === 'user' && !isReadonly && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="px-2 h-fit rounded-full text-muted-foreground opacity-0 group-hover/message:opacity-100"
                                                onClick={() => {
                                                    setMode('edit');
                                                }}
                                            >
                                                <PencilIcon />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit message</TooltipContent>
                                    </Tooltip>
                                )}

                                <div
                                    className={cn('flex flex-col gap-4', {
                                        'bg-primary text-primary-foreground px-3 py-2 rounded-xl':
                      message.role === 'user',
                                    })}
                                >
                                    <Markdown>{message.content as string}</Markdown>
                                </div>
                            </div>
                        )}

                        {/* {message.content && mode === 'edit' && (
                            <div className="flex flex-row gap-2 items-start">
                                <div className="size-8" />

                                <MessageEditor
                                    key={message.id}
                                    message={message}
                                    setMode={setMode}
                                    setMessages={setMessages}
                                    reload={reload}
                                />
                            </div>
                        )} */}

                        {/* {!isReadonly && (
                            <MessageActions
                                key={`action-${message.id}`}
                                chatId={chatId}
                                message={message}
                                vote={vote}
                                isLoading={isLoading}
                            />
                        )} */}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export const PreviewMessage = memo(
    PurePreviewMessage,
    (prevProps, nextProps) => {
        if (prevProps.message.content !== nextProps.message.content) return false;
        if (
            !equal(
                prevProps.message.toolInvocations,
                nextProps.message.toolInvocations,
            )
        )
            return false;

        return true;
    },
);

export const ThinkingMessage = () => {
    const role = 'assistant';

    return (
        <motion.div
            className="w-full mx-auto max-w-3xl px-4 group/message "
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
            data-role={role}
        >
            <div
                className={cx(
                    'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl',
                    {
                        'group-data-[role=user]/message:bg-muted': true,
                    },
                )}
            >
                <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
                    <WandSparklesIcon size={14} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-4 text-muted-foreground">
                        Thinking...
                    </div>
                </div>
            </div>
        </motion.div>
    );
};