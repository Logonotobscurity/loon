import { Message, IConversationRepository } from '../types';
import { BaseStorageRepository } from '../services/storage/BaseStorageRepository';

export class ConversationRepository
  extends BaseStorageRepository<Message[]>
  implements IConversationRepository
{
  private readonly STORAGE_KEY = 'conversation_messages';

  async getMessages(): Promise<Message[]> {
    const messages = await this.get(this.STORAGE_KEY);
    return messages || [];
  }

  async saveMessages(messages: Message[]): Promise<void> {
    await this.set(this.STORAGE_KEY, messages);
  }

  async clearMessages(): Promise<void> {
    await this.remove(this.STORAGE_KEY);
  }

  async addMessage(message: Message): Promise<void> {
    const messages = await this.getMessages();
    messages.push(message);
    await this.saveMessages(messages);
  }

  async removeMessage(messageId: string): Promise<void> {
    const messages = await this.getMessages();
    const filteredMessages = messages.filter(msg => msg.id !== messageId);
    await this.saveMessages(filteredMessages);
  }

  async getMessageCount(): Promise<number> {
    const messages = await this.getMessages();
    return messages.length;
  }
}